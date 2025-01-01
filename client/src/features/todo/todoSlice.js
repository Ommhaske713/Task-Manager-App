import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get("http://localhost:3001/todos");
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await axios.post("http://localhost:3001/todos", todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`http://localhost:3001/todos/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    updateTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo._id === action.payload.id);
      if (todo) {
       todo.text = action.payload.text;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        const fetchedTodos = action.payload;
        fetchedTodos.forEach((todo) => {
          const exists = state.todos.some(
            (existingTodo) => existingTodo.text.trim() === todo.text.trim()
          );
          if (!exists) {
            state.todos.push(todo);
          }
        });
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        const newTodo = action.payload;
        const exists = state.todos.some(
          (todo) => todo.text.trim() === newTodo.text.trim()
        );
        if (!exists) {
          state.todos.push(newTodo);
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      });
  },
});

export const { updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
