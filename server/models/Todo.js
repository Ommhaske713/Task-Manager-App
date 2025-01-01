import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  email: { type: String, required: true },
  completed: { type: Boolean, default: false },
  reminderSent10Min: { type: Boolean, default: false },
  reminderSentOnTime: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;