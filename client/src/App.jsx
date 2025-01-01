import React, { useState } from 'react'
import AddTodo from './component/AddTodo'
import Todos from './component/Todos'
import { FaSun, FaMoon } from 'react-icons/fa'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`w-full h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} transition duration-500`}>
      <div className={`w-full h-full p-8 ${darkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'}`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-2xl font-semibold flex justify-center items-center ml-[610px] ${darkMode ? 'text-white' : 'text-black'}`}>Task Manager</h1>
          <button onClick={toggleDarkMode} className="focus:outline-none">
            {darkMode ? <FaSun className="text-yellow-500 w-8 h-8 " /> : <FaMoon className="text-gray-800 w-8 h-8" />}
          </button>
        </div>
        <AddTodo darkMode={darkMode} />
        <Todos darkMode={darkMode} />
      </div>
    </div>
  )
}

export default App
