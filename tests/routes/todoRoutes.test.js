import request from 'supertest';
import express from 'express';
import router from '../../app/routes/todosRoutes.js';
import * as todoController from '../../app/controllers/todoController.js';

jest.mock('../../app/controllers/todoController.js');

const app = express();
app.use(express.json());
app.use('/', router);

describe('todoRoutes', () => {
  it('should get all todos', async () => {
    todoController.getTodos.mockImplementation((req, res) => res.status(200).json([{ title: 'Test Todo' }]));

    const res = await request(app).get('/');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('title');
  });

  it('should create a todo', async () => {
    todoController.createTodo.mockImplementation((req, res) => res.status(201).json({ title: 'Test Todo' }));

    const res = await request(app)
      .post('/')
      .send({
        title: 'Test Todo'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title');
  });

  it('should get a todo', async () => {
    todoController.getTodo.mockImplementation((req, res) => res.status(200).json({ title: 'Test Todo' }));

    const res = await request(app).get('/testid');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title');
  });

  it('should update a todo', async () => {
    todoController.updateTodo.mockImplementation((req, res) => res.status(200).json({ title: 'Updated Todo' }));

    const res = await request(app)
      .put('/testid')
      .send({
        title: 'Updated Todo'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title');
  });

  it('should delete a todo', async () => {
    todoController.deleteTodo.mockImplementation((req, res) => res.status(200).json({}));

    const res = await request(app).delete('/testid');

    expect(res.statusCode).toEqual(200);
  });
});
