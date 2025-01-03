import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo } from "../features/todo/todoSlice";
import UpdateTodo from "./UpdateTodo";

const Todos = ({ darkMode }) => {
  const dispatch = useDispatch();
  const { todos, status, error } = useSelector((state) => state.todo); 

  useEffect(() => {
    dispatch(fetchTodos()); 
  }, [dispatch]);

  if (status === "loading") {
    return <p className="text-center">Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mt-12 px-8">
      <h3
        className={`text-3xl font-medium text-center mb-8 mr-1 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
         Added Tasks
      </h3>
      <div className="w-full h-auto flex flex-wrap flex-col items-center text-center">
        <div className="w-36 h-1 border-b-4 border-yellow-400 rounded-2xl mb-20 mt-[-22px] " ></div>
      </div>
      <ul className="space-y-4">
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <li
              key={todo._id}
              className={`flex justify-between items-center p-4 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <span
                className={`text-xl ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {todo.text || "No text"} - {todo.date || "No date"}
              </span>

              <div className="flex items-center space-x-4">
                <UpdateTodo todo={todo} darkMode={darkMode} />
                <button
                  onClick={() => dispatch(deleteTodo(todo._id))}
                  className="text-white bg-red-500 py-2 px-4 rounded-lg focus:outline-none hover:bg-red-600 transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks available.</p>
        )}
      </ul>
    </div>
  );
};

export default Todos;
