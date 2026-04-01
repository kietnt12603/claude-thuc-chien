import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { Request, Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            refresh: jest.fn(),
            logout: jest.fn(),
            getProfile: jest.fn(),
            updateProfile: jest.fn(),
            changePassword: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get(AuthService);
  });

  describe('login', () => {
    it('should set refresh_token cookie and return access token', async () => {
      const dto = { email: 'test@example.com', password: 'pw' };
      const req = { ip: '1.2.3.4', headers: { 'user-agent': 'jest' } } as Request;
      const res = { cookie: jest.fn() } as unknown as Response;

      service.login.mockResolvedValue({
        accessToken: 'access',
        refreshToken: 'refresh',
        user: { id: 1 } as any,
      });

      const result = await controller.login(dto, req, res);

      expect(res.cookie).toHaveBeenCalledWith('refresh_token', 'refresh', expect.any(Object));
      expect(result.accessToken).toBe('access');
    });
  });

  describe('refresh', () => {
    it('should issue new tokens and update cookie', async () => {
      const req = { cookies: { refresh_token: 'old_refresh' }, ip: '', headers: {} } as Request;
      const res = { cookie: jest.fn() } as unknown as Response;

      service.refresh.mockResolvedValue({
        accessToken: 'new_access',
        refreshToken: 'new_refresh',
      });

      const result = await controller.refresh(req, res);

      expect(res.cookie).toHaveBeenCalledWith('refresh_token', 'new_refresh', expect.any(Object));
      expect(result.accessToken).toBe('new_access');
    });

    it('should throw UnauthorizedException if no cookie', async () => {
      const req = { cookies: {} } as Request;
      const res = {} as Response;

      await expect(controller.refresh(req, res)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('should revoke token and clear cookie', async () => {
      const req = { cookies: { refresh_token: 'token' } } as Request;
      const res = { clearCookie: jest.fn() } as unknown as Response;

      await controller.logout(req, res);

      expect(service.logout).toHaveBeenCalledWith('token');
      expect(res.clearCookie).toHaveBeenCalledWith('refresh_token');
    });
  });
});
