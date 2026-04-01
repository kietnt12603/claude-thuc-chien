import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: jest.Mocked<UserService>;

  const mockUser = {
    id: 1,
    email: 'admin@example.com',
    full_name: 'Admin User',
    phone: '0987654321',
    role_id: 1,
    is_active: true,
  } as User;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct dto', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
        phone: '123456789',
        roleId: 2,
        isActive: true,
      };

      service.create.mockResolvedValue(mockUser);
      
      const result = await controller.create(dto);
      
      expect(result).toEqual(mockUser);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      service.findAll.mockResolvedValue([mockUser]);

      const result = await controller.findAll();

      expect(result).toEqual([mockUser]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      service.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockUser);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update user and return the updated user', async () => {
      const dto: UpdateUserDto = { fullName: 'Updated Admin', roleId: 3 };
      service.update.mockResolvedValue({ ...mockUser, ...dto, full_name: dto.fullName, role_id: dto.roleId } as User);

      const result = await controller.update('1', dto);

      expect(result.full_name).toEqual(dto.fullName);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should call service.remove safely', async () => {
      service.remove.mockResolvedValue();

      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
