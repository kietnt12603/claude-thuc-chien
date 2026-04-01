import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth.service';
import { UserRepository } from '../../user/repositories/user.repository';
import { RoleRepository } from '../../role/repositories/role.repository';
import { RefreshTokenRepository } from '../repositories/refresh-token.repository';
import { User } from '../../user/entities/user.entity';
import { Role } from '../../role/entities/role.entity';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: jest.Mocked<UserRepository>;
  let roleRepository: jest.Mocked<RoleRepository>;
  let refreshTokenRepository: jest.Mocked<RefreshTokenRepository>;
  let jwtService: jest.Mocked<JwtService>;
  let configService: jest.Mocked<ConfigService>;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password_hash: 'hashed_password',
    full_name: 'Test User',
    role_id: 1,
    is_active: true,
    role: { id: 1, name: 'customer' } as Role,
  } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: RoleRepository,
          useValue: {
            findByName: jest.fn(),
          },
        },
        {
          provide: RefreshTokenRepository,
          useValue: {
            findByTokenHash: jest.fn(),
            revokeAllByUserId: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(UserRepository);
    roleRepository = module.get(RoleRepository);
    refreshTokenRepository = module.get(RefreshTokenRepository);
    jwtService = module.get(JwtService);
    configService = module.get(ConfigService);
  });

  describe('refresh', () => {
    it('should issue new tokens if refresh token is valid', async () => {
      const storedToken = { user: mockUser, expires_at: new Date(Date.now() + 10000), is_revoked: false };
      refreshTokenRepository.findByTokenHash.mockResolvedValue(storedToken as any);
      jwtService.signAsync.mockResolvedValue('new_token');

      const result = await service.refresh('valid_token', { ip: '', agent: '' });

      expect(result.accessToken).toBe('new_token');
      expect(storedToken.is_revoked).toBe(true);
    });

    it('should throw UnauthorizedException if token is revoked', async () => {
      const storedToken = { user: mockUser, expires_at: new Date(Date.now() + 10000), is_revoked: true };
      refreshTokenRepository.findByTokenHash.mockResolvedValue(storedToken as any);

      await expect(service.refresh('revoked_token', { ip: '', agent: '' })).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('should revoke the token if it exists', async () => {
      const storedToken = { is_revoked: false };
      refreshTokenRepository.findOne.mockResolvedValue(storedToken as any);

      await service.logout('token');

      expect(storedToken.is_revoked).toBe(true);
      expect(refreshTokenRepository.save).toHaveBeenCalled();
    });
  });

  describe('profile', () => {
    it('should return profile without password', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      const result = await service.getProfile(1);
      expect(result).not.toHaveProperty('password_hash');
    });

    it('should throw NotFoundException if user missing', async () => {
      userRepository.findOne.mockResolvedValue(null);
      await expect(service.getProfile(999)).rejects.toThrow(NotFoundException);
    });
  });
});
