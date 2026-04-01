import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password_hash: 'hashedPassword',
    full_name: 'Test User',
    phone: '0901234567',
    role_id: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  } as User;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(UserRepository) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user and return without password_hash', async () => {
      const dto = {
        email: 'new@example.com',
        password: 'password123',
        fullName: 'New User',
        phone: '123456789',
        roleId: 2,
        isActive: true,
      };

      repository.findOne.mockResolvedValue(null);
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPass');
      
      const createdUserEntity = { ...mockUser, email: dto.email, password_hash: 'hashedPass', full_name: dto.fullName, phone: dto.phone, role_id: dto.roleId };
      repository.create.mockReturnValue(createdUserEntity);
      repository.save.mockResolvedValue(createdUserEntity);

      const result = await service.create(dto);
      
      expect(result.id).toBe(1);
      expect(result.email).toBe(dto.email);
      expect((result as any).password_hash).toBeUndefined();
    });

    it('should throw ConflictException if email exists', async () => {
      const dto = { email: 'test@example.com', password: '123', fullName: 'A', roleId: 1 };
      repository.findOne.mockResolvedValue(mockUser);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return all users without password_hash', async () => {
      repository.find.mockResolvedValue([mockUser]);

      const result = await service.findAll();
      expect(result.length).toBe(1);
      expect((result[0] as any).password_hash).toBeUndefined();
      expect(result[0].email).toBe(mockUser.email);
    });
  });

  describe('findOne', () => {
    it('should return a user without password_hash', async () => {
      repository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne(1);
      expect(result.id).toBe(mockUser.id);
      expect((result as any).password_hash).toBeUndefined();
    });

    it('should throw NotFoundException if user not found', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update user info successfully', async () => {
      const dto = { fullName: 'Updated Name', phone: '987654321', email: 'updated@example.com' };
      
      // Mock findOne for existing user check
      repository.findOne
        .mockResolvedValueOnce(mockUser) // the user to update
        .mockResolvedValueOnce(null); // the existing user with same email (for conflict check)
        
      repository.save.mockImplementation(async (u) => u as User);

      const result = await service.update(1, dto);
      expect(result.full_name).toBe(dto.fullName);
      expect(result.phone).toBe(dto.phone);
      expect(result.email).toBe(dto.email);
    });

    it('should throw ConflictException if new email is taken by another user', async () => {
      const dto = { email: 'taken@example.com' };
      
      repository.findOne
        .mockResolvedValueOnce({ ...mockUser, id: 1 }) // user to update
        .mockResolvedValueOnce({ ...mockUser, id: 2, email: 'taken@example.com' }); // existing email

      await expect(service.update(1, dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('should remove user', async () => {
      repository.findOne.mockResolvedValue(mockUser);
      repository.remove.mockResolvedValue(mockUser);

      await expect(service.remove(1)).resolves.not.toThrow();
      expect(repository.remove).toHaveBeenCalledWith(mockUser);
    });
  });
});
