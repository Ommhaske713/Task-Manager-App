import cron from 'node-cron';
import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Todo from './models/Todo.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const nowISO = now.toISOString();
  const nowDate = nowISO.split('T')[0];
  const nowTime = nowISO.split('T')[1].substring(0, 5);

  try {
    const todos = await Todo.find({ date: nowDate });
    todos.forEach(async (todo) => {
      const taskDateTime = new Date(`${todo.date}T${todo.time}`);
      const diffMinutes = (taskDateTime - now) / (1000 * 60);

      if (diffMinutes <= 10 && diffMinutes > 0 && !todo.reminderSent10Min) {
        try {
          await axios.post('http://localhost:3001/send-email', {
            email: todo.email,
            subject: 'Reminder: ' + todo.text,
            text: 'This is a reminder for your todo: ' + todo.text + ' in 10 minutes.',
          });
          console.log('10-minute reminder email sent for todo:', todo.text);

          // Update the reminderSent10Min flag
          todo.reminderSent10Min = true;
          await todo.save();
        } catch (error) {
          console.error('Error sending 10-minute reminder email:', error);
        }
      }

      if (diffMinutes <= 0 && diffMinutes >= -1 && !todo.reminderSentOnTime) {
        try {
          await axios.post('http://localhost:3001/send-email', {
            email: todo.email,
            subject: 'Reminder: ' + todo.text,
            text: 'This is a reminder for your todo: ' + todo.text + ' now.',
          });
          console.log('On-time reminder email sent for todo:', todo.text);

          // Update the reminderSentOnTime flag
          todo.reminderSentOnTime = true;
          await todo.save();
        } catch (error) {
          console.error('Error sending on-time reminder email:', error);
        }
      }
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
});