import request from 'supertest';
import { getTodos, createTodo, getTodo, updateTodo, deleteTodo } from '../../app/controllers/todoController.js';
import Todo from '../../app/models/Todos.js';

jest.mock('../../app/models/Todos.js');

describe('todoController', () => {
  beforeEach(() => {
    Todo.mockClear();
  });

  describe('getTodos', () => {
    it('should get all todos', async () => {
      const req = {
        query: {
          user: 'testuser'
        }
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await getTodos(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('createTodo', () => {
    it('should create a todo', async () => {
      const req = {
        body: {
          title: 'Test Todo'
        }
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await createTodo(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('getTodo', () => {
    it('should get a todo', async () => {
      const req = {
        params: {
          id: 'testid'
        }
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      Todo.findById.mockResolvedValue({});

      await getTodo(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('updateTodo', () => {
    it('should update a todo', async () => {
      const req = {
        params: {
          id: 'testid'
        },
        body: {
          title: 'Updated Todo'
        }
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      Todo.findByIdAndUpdate.mockResolvedValue({});

      await updateTodo(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      const req = {
        params: {
          id: 'testid'
        }
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      Todo.findByIdAndDelete.mockResolvedValue({});

      await deleteTodo(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });
});
