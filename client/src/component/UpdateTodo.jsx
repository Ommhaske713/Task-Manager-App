import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../features/todo/todoSlice';

const UpdateTodo = ({ todo, darkMode }) => {
  const [input, setInput] = useState('');
  const [buttonColor, setButtonColor] = useState('bg-gray-500');
  const [borderShadow, setBorderShadow] = useState('');

  useEffect(() => {
    if (todo) {
      setInput(todo.text);
    }
  }, [todo]);

  const dispatch = useDispatch();

  const updateTodoHandler = () => {
    if (todo) {
      dispatch(updateTodo({ id: todo._id, text: input }));
      setButtonColor('bg-green-500');
      setBorderShadow('shadow-custom-green p-4 rounded-lg');
      setTimeout(() => {
        setButtonColor('bg-gray-500');
        setBorderShadow('');
      }, 4000);
    }
  };

  if (!todo) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={`p-2 rounded-md border focus:ring-2 focus:ring-indigo-900 w-full max-w-xs ${
          darkMode ? 'bg-gray-900 text-white border-gray-600 focus:border-indigo-500' : 'bg-gray-100 text-black border-gray-300 focus:border-indigo-500'
        } `}
      />
      <button
        className={`${buttonColor} ${borderShadow} text-white py-2 px-4 rounded-lg focus:outline-none transition duration-200 ease-in-out`}
        onClick={updateTodoHandler}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateTodo;