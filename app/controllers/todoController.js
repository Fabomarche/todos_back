import Todo from "../models/Todos.js";

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.query.user });
        res.json(todos);
    } catch (error) {
        res.status(500).send({ error: 'Error getting todos' });
    }
};


export const createTodo = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({ error: 'Title is required' });
        }

        const todo = new Todo({
            ...req.body,
        });

        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).send({ error: 'Error creating todo' });
    }
};


export const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).send({ error: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).send({ error: 'Error getting todo' });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
        if (!todo) {
            return res.status(404).send({ error: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).send({ error: 'Error updating todo' });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).send({ error: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).send({ error: 'Error deleting todo' });
    }
};
