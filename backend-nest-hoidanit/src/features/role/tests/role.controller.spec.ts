import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from '../role.controller';
import { RoleService } from '../role.service';
import { Role } from '../entities/role.entity';

describe('RoleController', () => {
  let controller: RoleController;
  let service: jest.Mocked<RoleService>;

  const mockRole: Role = {
    id: 1,
    name: 'ADMIN',
    description: 'System administrator',
  };

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<RoleController>(RoleController);
    service = module.get(RoleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call service.findAll', async () => {
      service.findAll.mockResolvedValue([mockRole]);
      const result = await controller.findAll();
      expect(result).toEqual([mockRole]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a role', async () => {
      service.findOne.mockResolvedValue(mockRole);
      const result = await controller.findOne(1);
      expect(result).toEqual(mockRole);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should call service.create', async () => {
      const dto = { name: 'USER' };
      service.create.mockResolvedValue({ id: 2, ...dto } as Role);
      
      const result = await controller.create(dto);
      expect(result).toHaveProperty('id', 2);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should call service.update', async () => {
      const dto = { name: 'NEW_NAME' };
      service.update.mockResolvedValue({ ...mockRole, ...dto });

      const result = await controller.update(1, dto);
      expect(result.name).toBe(dto.name);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should call service.remove', async () => {
      service.remove.mockResolvedValue(undefined);
      await expect(controller.remove(1)).resolves.toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
