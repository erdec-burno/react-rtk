import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITodo} from "../api/dto/ITodo";

const initialState: { todos: ITodo[]; isLoading: boolean } = {
    todos: [],
    isLoading: false
};

export const getTodosThunk = createAsyncThunk<ITodo[]>(
  "todos/getTodos",
  async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );

      return await response.json();
  }
);

export const removeTodoThunk = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
      await fetch("https://jsonplaceholder.typicode.com/todos/" + id, {
          method: "DELETE"
      });

      return id;
  }
);

export const toggleCompleteTodoThunk = createAsyncThunk(
  "todos/toggleComplete",
  async (todo: ITodo) => {
      const result = await fetch(
        "https://jsonplaceholder.typicode.com/todos/" + todo.id,
        {
            method: "PUT",
            body: JSON.stringify({ completed: !todo.completed }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
      );
    return await result.json();
  }
);

const todoSlice = createSlice({
    name: "todosData",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.todos.push({
                id: Math.random() * 100,
                title: action.payload,
                completed: false
            });
        }
    },
    extraReducers: {
        [getTodosThunk.fulfilled.type]: (
          state,
          { payload }: PayloadAction<ITodo[]>
        ) => {
            state.todos = payload;
        },
        [removeTodoThunk.pending.type]: (state) => {
            state.isLoading = true;
        },
        [removeTodoThunk.fulfilled.type]: (
          state,
          { payload }: PayloadAction<number>
        ) => {
            state.todos = state.todos.filter((todo) => todo.id !== payload);
            state.isLoading = false;
        },
        [removeTodoThunk.rejected.type]: (state) => {},
        [toggleCompleteTodoThunk.pending.type]: (state) => {
            state.isLoading = true;
        },
        [toggleCompleteTodoThunk.fulfilled.type]: (
          state,
          { payload }: PayloadAction<ITodo>
        ) => {
            const toggledTodo = state.todos.find((todo) => todo.id === payload.id);
            if (toggledTodo) {
              toggledTodo.completed = !toggledTodo.completed;
            }
            state.isLoading = false;
        }
    }
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
