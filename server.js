import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import config from "./app/config/config.js";
import todoRoutes from "./app/routes/todosRoutes.js";
import usersRoutes from "./app/routes/usersRoutes.js";

mongoose.connect(config.mongo.url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("Connected to DB"))
    .catch(()=> console.log("DB connection Error"));

const app = express();
const PORT = process.env.PORT||8080;
app.use(express.json());
app.use(cors());

app.use("/todos", todoRoutes);
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to To do list." });
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

start();
