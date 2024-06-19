import mongoose from "mongoose";

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
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
});

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
