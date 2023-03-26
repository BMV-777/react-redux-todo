import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk(
  "todo/fetchTodo",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );

      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const todoDelete = createAsyncThunk(
  "todo/todoDelete",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Do not delete. Server error");
      }

      dispatch(removeTodo({ id }));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  "todo/toggleStatus",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todos = getState().todo.todo.find((todos) => todos.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Context-type": "application/json",
          },
          body: JSON.stringify({ completed: !todos.completed }),
        }
      );

      if (!response.ok) {
        throw new Error("Do not status. Server error");
      }

      dispatch(toggleTodoComplete({ id }));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const addleNewTodo = createAsyncThunk(
  "todo/addNewTodo",
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
      };

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todo),
        }
      );

      if (!response.ok) {
        throw new Error("Error777");
      }

      const data = await response.json();
      console.log(data);
      dispatch(addTodo(data));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todo: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todo.push(action.payload);
    },

    removeTodo(state, action) {
      state.todo = state.todo.filter((todos) => todos.id !== action.payload.id);
    },
    toggleTodoComplete(state, action) {
      const toggleTodo = state.todo.find(
        (todos) => todos.id === action.payload.id
      );
      toggleTodo.completed = !toggleTodo.completed;
    },
  },
  extraReducers: {
    [fetchTodo.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchTodo.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.todo = action.payload;
    },
    [fetchTodo.rejected]: setError,
    [todoDelete.rejected]: setError,
    [toggleStatus.rejected]: setError,
  },
});

const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
