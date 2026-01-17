import { accessControlMiddleware } from '../../../../src/modules/organization/presentation/http/middlewares/access-control.middleware';
import { AppError } from '../../../../src/shared/utils/AppError';

describe('AccessControlMiddleware', () => {
  it('should reject when actor user id is missing', () => {
    const req = {
      params: { id: 'user-1' },
      headers: {},
      originalUrl: '/organization/users/user-1',
    } as any;
    const res = {} as any;
    const next = jest.fn();

    accessControlMiddleware(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(403);
    expect(error.code).toBe('FORBIDDEN');
  });

  it('should reject when actor user id does not match', () => {
    const req = {
      params: { id: 'user-1' },
      headers: { 'x-actor-user-id': 'user-2' },
      originalUrl: '/organization/users/user-1',
    } as any;
    const res = {} as any;
    const next = jest.fn();

    accessControlMiddleware(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error.statusCode).toBe(403);
  });

  it('should allow when actor user id matches', () => {
    const req = {
      params: { id: 'user-1' },
      headers: { 'x-actor-user-id': 'user-1' },
      originalUrl: '/organization/users/user-1',
    } as any;
    const res = {} as any;
    const next = jest.fn();

    accessControlMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it('should allow business unit access when actor user id present', () => {
    const req = {
      params: { id: 'unit-1' },
      headers: { 'x-actor-user-id': 'user-1' },
      originalUrl: '/organization/business-units/unit-1',
    } as any;
    const res = {} as any;
    const next = jest.fn();

    accessControlMiddleware(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });
});
