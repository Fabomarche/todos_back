import express, { json } from "express"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import cors from 'cors'
import config from "./app/config/config.js"



mongoose.connect(config.mongo.url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("Connected to DB"))
    .catch(()=> console.log("DB connection Error"))

const app = express()
const PORT = process.env.PORT||8080
app.use(express.json());
app.use(cors())


const TodoSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    },
    completed: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const Todo = mongoose.model("Todo", TodoSchema);

const UserSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  }
});

UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", UserSchema);


app.get("/", (req, res) => {
    res.json({ message: "Welcome to To do list." });
  });

  app.get("/todos", async (req, res) => {
    const todos = await Todo.find({});
    res.json(todos);
  });
  
  app.post("/todos", async (req, res) => {
    const todo = await Todo.create(req.body);
    res.json(todo);
  });
  
  app.get("/todos/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  });
  
  app.put("/todos/:id", async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.json(todo);
  });
  app.delete("/todos/:id", async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json(todo);
  });

  app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/users/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            throw new Error('Unable to login');
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            throw new Error('Unable to login');
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});


  function connectDB(url) {
    return mongoose.connect(url);
  }
  
  async function start() {
    try {
      await connectDB(config.mongo.url);
      app.listen(PORT, () => {
        console.log(`App running on PORT ${PORT}`);
      });
    } catch (err) {
      console.log(err);
    }
  }

  start()