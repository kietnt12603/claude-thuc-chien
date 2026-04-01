import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  constructor(private readonly roleRepository: RoleRepository) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.findAllRoles();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new NotFoundException(`Role with ID #${id} not found`);
    }
    return role;
  }

  async create(dto: CreateRoleDto): Promise<Role> {
    const existing = await this.roleRepository.findByName(dto.name);
    if (existing) {
      throw new ConflictException(`Role with name "${dto.name}" already exists`);
    }

    const role = this.roleRepository.create(dto);
    return this.roleRepository.save(role);
  }

  async update(id: number, dto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);

    if (dto.name) {
      const existing = await this.roleRepository.findByName(dto.name);
      if (existing && existing.id !== role.id) {
        throw new ConflictException(`Role with name "${dto.name}" already exists`);
      }
      role.name = dto.name;
    }

    if (dto.description !== undefined) {
      role.description = dto.description;
    }

    return this.roleRepository.save(role);
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
    this.logger.log(`Role with ID #${id} removed`);
  }
}
