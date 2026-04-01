import { ConflictException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/repositories/user.repository';
import { RoleRepository } from '../role/repositories/role.repository';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtPayload } from './types/jwt-payload.type';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private refreshTokenRepository: RefreshTokenRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const existing = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Email đã tồn tại trong hệ thống.');
    }

    const userRole = await this.roleRepository.findByName('USER');
    if (!userRole) {
      throw new ConflictException('Hệ thống chưa cấu hình vai trò mặc định.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const user = this.userRepository.create({
      email: dto.email,
      password_hash: hashedPassword,
      full_name: dto.fullName,
      phone: dto.phone,
      role_id: userRole.id,
      is_active: true,
    });

    const savedUser = await this.userRepository.save(user);
    return this.transformUser(savedUser);
  }

  async login(dto: LoginDto, deviceInfo: { ip: string; agent: string }) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      relations: ['role'],
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password_hash))) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác.');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('Tài khoản của bạn đã bị vô hiệu hóa.');
    }

    const payload: JwtPayload = {
      sub: Number(user.id),
      email: user.email,
      role: user.role.name,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.generateRefreshToken(user.id, deviceInfo);

    return {
      accessToken,
      refreshToken,
      user: this.transformUser(user),
    };
  }

  async refresh(token: string, deviceInfo: { ip: string; agent: string }) {
    const refreshTokenHash = await this.hashToken(token);
    const storedToken = await this.refreshTokenRepository.findByTokenHash(refreshTokenHash);

    if (!storedToken || storedToken.expires_at < new Date() || storedToken.is_revoked) {
      throw new UnauthorizedException('Phiên đăng nhập đã hết hạn.');
    }

    const user = storedToken.user;
    const payload: JwtPayload = {
      sub: Number(user.id),
      email: user.email,
      role: user.role.name,
    };

    const newAccessToken = await this.jwtService.signAsync(payload);
    
    // Rotate refresh token
    storedToken.is_revoked = true;
    await this.refreshTokenRepository.save(storedToken);
    
    const newRefreshToken = await this.generateRefreshToken(user.id, deviceInfo);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(token: string) {
    const refreshTokenHash = await this.hashToken(token);
    const storedToken = await this.refreshTokenRepository.findOne({ where: { token_hash: refreshTokenHash } });
    if (storedToken) {
      storedToken.is_revoked = true;
      await this.refreshTokenRepository.save(storedToken);
    }
  }

  async getProfile(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['role'],
    });
    if (!user) throw new NotFoundException('Không tìm thấy người dùng.');
    return this.transformUser(user);
  }

  async updateProfile(userId: number, dto: UpdateProfileDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Không tìm thấy người dùng.');

    if (dto.fullName) user.full_name = dto.fullName;
    if (dto.phone) user.phone = dto.phone;

    const saved = await this.userRepository.save(user);
    return this.transformUser(saved);
  }

  async changePassword(userId: number, dto: ChangePasswordDto): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Không tìm thấy người dùng.');

    const isMatch = await bcrypt.compare(dto.currentPassword, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedException('Mật khẩu hiện tại không chính xác.');
    }

    const salt = await bcrypt.genSalt(10);
    user.password_hash = await bcrypt.hash(dto.newPassword, salt);
    await this.userRepository.save(user);
  }

  private async generateRefreshToken(userId: number, deviceInfo: { ip: string; agent: string }): Promise<string> {
    const token = await this.jwtService.signAsync(
      { sub: userId },
      {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshExpiresIn') as any,
      },
    );

    const tokenHash = await this.hashToken(token);
    const expiresAt = new Date();
    // Default 7 days if not parsed correctly, but better to parse config
    expiresAt.setDate(expiresAt.getDate() + 7);

    const refreshTokenEntity = this.refreshTokenRepository.create({
      user_id: userId,
      token_hash: tokenHash,
      ip_address: deviceInfo.ip,
      user_agent: deviceInfo.agent,
      expires_at: expiresAt,
    });

    await this.refreshTokenRepository.save(refreshTokenEntity);
    return token;
  }

  private async hashToken(token: string): Promise<string> {
    // Simple SHA256 for token storage/lookup
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private transformUser(user: User): any {
    const { password_hash, role, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      role: typeof role === 'object' ? (role as any).name : role,
    };
  }
}
