import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email đã tồn tại trong hệ thống.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = this.userRepository.create({
      email: createUserDto.email,
      password_hash: hashedPassword,
      full_name: createUserDto.fullName,
      phone: createUserDto.phone,
      role_id: createUserDto.roleId,
      is_active: createUserDto.isActive ?? true,
    });

    const savedUser = await this.userRepository.save(newUser);
    return this.excludePassword(savedUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['role'],
    });
    return users.map(user => this.excludePassword(user));
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException(`Không tìm thấy user với id: ${id}`);
    }

    return this.excludePassword(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Không tìm thấy user với id: ${id}`);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser) {
        throw new ConflictException('Email đã tồn tại trong hệ thống.');
      }
      user.email = updateUserDto.email;
    }

    if (updateUserDto.fullName !== undefined) {
      user.full_name = updateUserDto.fullName;
    }
    if (updateUserDto.phone !== undefined) {
      user.phone = updateUserDto.phone;
    }
    if (updateUserDto.roleId !== undefined) {
      user.role_id = updateUserDto.roleId;
    }
    if (updateUserDto.isActive !== undefined) {
      user.is_active = updateUserDto.isActive;
    }

    const updatedUser = await this.userRepository.save(user);
    return this.excludePassword(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy user với id: ${id}`);
    }

    // Tùy theo logic dự án, có thể Soft Delete (update is_active = false)
    // Theo chuẩn DB thì is_active là Cờ Delete. Ở đây giả lập Hard xóa hoặc set cờ
    await this.userRepository.remove(user);
  }

  private excludePassword(user: User): User {
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
}
