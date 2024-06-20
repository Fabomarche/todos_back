import request from 'supertest';
import express from 'express';
import router from '../../app/routes/usersRoutes.js';
import * as userController from '../../app/controllers/usersController.js';

jest.mock('../../app/controllers/usersController.js');

const app = express();
app.use(express.json());
app.use('/', router);

describe('usersRoutes', () => {
  it('should create a new user', async () => {
    userController.createUser.mockImplementation((req, res) => res.status(201).json({ username: 'testuser' }));

    const res = await request(app)
      .post('/')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username');
  });

  it('should login a user', async () => {
    userController.loginUser.mockImplementation((req, res) => res.status(200).json({ username: 'testuser' }));

    const res = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username');
  });
});
