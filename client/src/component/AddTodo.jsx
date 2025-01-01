import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';

const AddTodo = ({ darkMode }) => {
  const [input, setInput] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const addTodoHandler = async (e) => {
    e.preventDefault();

    const newTodo = { text: input, date, time, email };
    console.log('Dispatching newTodo:', newTodo);

    dispatch(addTodo(newTodo));
    setInput('');
    setDate('');
    setTime('');
    setEmail('');

    try {
      await axios.post('http://localhost:3001/todos', newTodo);
      console.log('Todo added');
    } catch (error) {
      console.error('Error adding todo:', error);
    }

    const today = new Date().toISOString().split('T')[0];
    if (date === today) {
      try {
        await axios.post('http://localhost:3001/send-email', {
          email,
          subject: 'Reminder: ' + input,
          text: 'This is a reminder for your todo: ' + input,
        });
        console.log('Email sent');
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
  };

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12 flex justify-center">
      <input
        type="text"
        className={`w-full max-w-[550px] px-4 py-3 text-lg rounded-lg border focus:outline-none focus:ring-2 placeholder-gray-400 shadow-lg ml-24 ${
          darkMode ? 'bg-gray-800 text-white border-gray-600 focus:ring-blue-500' : 'bg-gray-100 text-black border-gray-300 focus:ring-blue-500'
        }`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter new task"
      />
      <input
        type="date"
        className={`w-full max-w-[200px] px-4 py-3 text-lg rounded-lg border focus:outline-none focus:ring-2 placeholder-gray-400 shadow-lg ml-2 ${
          darkMode ? 'bg-gray-800 text-white border-gray-600 focus:ring-blue-500' : 'bg-gray-100 text-black border-gray-300 focus:ring-blue-500'
        }`}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        className={`w-full max-w-[200px] px-4 py-3 text-lg rounded-lg border focus:outline-none focus:ring-2 placeholder-gray-400 shadow-lg ml-2 ${
          darkMode ? 'bg-gray-800 text-white border-gray-600 focus:ring-blue-500' : 'bg-gray-100 text-black border-gray-300 focus:ring-blue-500'
        }`}
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        type="email"
        className={`w-full max-w-[300px] px-4 py-3 text-lg rounded-lg border focus:outline-none focus:ring-2 placeholder-gray-400 shadow-lg ml-2 ${
          darkMode ? 'bg-gray-800 text-white border-gray-600 focus:ring-blue-500' : 'bg-gray-100 text-black border-gray-300 focus:ring-blue-500'
        }`}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button
        className="px-6 py-3 bg-indigo-500 text-white text-lg rounded-lg hover:bg-indigo-600 transition duration-300 focus:outline-none shadow-md transform hover:scale-105"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;