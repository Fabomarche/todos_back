import request from 'supertest';
import bcrypt from 'bcryptjs';
import { createUser, loginUser } from '../../app/controllers/usersController.js';
import Users from '../../app/models/Users.js';

jest.mock('../../app/models/Users.js');

describe('usersController', () => {
  beforeEach(() => {
    Users.mockClear();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'testpassword'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalled();
    });

  });

  describe('loginUser', () => {
    it('should login a user', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'testpassword'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      Users.findOne.mockResolvedValue({
        username: 'testuser',
        password: bcrypt.hashSync('testpassword', 10)
      });

      await loginUser(req, res);

      expect(res.send).toHaveBeenCalled();
    });

  });
});
