import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { RoleService } from '../role.service';
import { RoleRepository } from '../repositories/role.repository';
import { Role } from '../entities/role.entity';

describe('RoleService', () => {
  let service: RoleService;
  let repository: jest.Mocked<RoleRepository>;

  const mockRole: Role = {
    id: 1,
    name: 'ADMIN',
    description: 'System administrator',
  };

  beforeEach(async () => {
    const mockRepository = {
      findAllRoles: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: RoleRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    repository = module.get(RoleRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const roles = [mockRole];
      repository.findAllRoles.mockResolvedValue(roles);
      
      const result = await service.findAll();
      expect(result).toEqual(roles);
      expect(repository.findAllRoles).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a role if found', async () => {
      repository.findById.mockResolvedValue(mockRole);
      
      const result = await service.findOne(1);
      expect(result).toEqual(mockRole);
    });

    it('should throw NotFoundException if not found', async () => {
      repository.findById.mockResolvedValue(null);
      
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new role', async () => {
      const dto = { name: 'MODERATOR', description: 'Can edit content' };
      repository.findByName.mockResolvedValue(null);
      repository.create.mockReturnValue(dto as Role);
      repository.save.mockResolvedValue({ id: 2, ...dto } as Role);

      const result = await service.create(dto);
      expect(result).toHaveProperty('id', 2);
      expect(result.name).toBe(dto.name);
    });

    it('should throw ConflictException if duplicate name', async () => {
      repository.findByName.mockResolvedValue(mockRole);
      const dto = { name: 'ADMIN' };

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update role name and description', async () => {
      const dto = { name: 'NEW_ADMIN', description: 'Updated desc' };
      repository.findById.mockResolvedValue(mockRole);
      repository.findByName.mockResolvedValue(null);
      repository.save.mockImplementation(async (role) => role as Role);

      const result = await service.update(1, dto);
      expect(result.name).toBe(dto.name);
      expect(result.description).toBe(dto.description);
    });

    it('should throw ConflictException if updated name exists in another role', async () => {
      const otherRole = { id: 2, name: 'OTHER' } as Role;
      repository.findById.mockResolvedValue(mockRole);
      repository.findByName.mockResolvedValue(otherRole);

      await expect(service.update(1, { name: 'OTHER' })).rejects.toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('should remove role successfully', async () => {
      repository.findById.mockResolvedValue(mockRole);
      repository.remove.mockResolvedValue(mockRole);

      await expect(service.remove(1)).resolves.not.toThrow();
      expect(repository.remove).toHaveBeenCalledWith(mockRole);
    });
  });
});
