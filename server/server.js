import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Todo from './models/Todo.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_URI);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/send-email', (req, res) => {
  const { email, subject, text } = req.body;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send(error.toString());
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.post('/todos', async (req, res) => {
  const { text, date, time, email } = req.body;
  const newTodo = new Todo({
    text,
    date,
    time,
    email,
  });
  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});