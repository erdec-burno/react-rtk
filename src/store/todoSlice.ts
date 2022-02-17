import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITodo} from "../api/dto/ITodo";

export const todosAdapter = createEntityAdapter<ITodo>();

/*const initialState: { todos: ITodo[]; isLoading: boolean } = {
    todos: [],
    isLoading: false
};*/
const initialState = todosAdapter.getInitialState<{ isLoading: boolean }>({ isLoading: false });

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
        addTodo(state, {payload}: PayloadAction<ITodo>) {
          state.ids.unshift(payload.id);
          state.entities[payload.id] = payload;
        }
    },
    extraReducers: {
        [getTodosThunk.fulfilled.type]: (
          state,
          { payload }: PayloadAction<ITodo[]>
        ) => {
            todosAdapter.setAll(state, payload);
        },
        [removeTodoThunk.pending.type]: (state) => {
            state.isLoading = true;
        },
        [removeTodoThunk.fulfilled.type]: (
          state,
          { payload }: PayloadAction<number>
        ) => {
            todosAdapter.removeOne(state, payload);
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
            todosAdapter.updateOne(state, { id: payload.id, changes: payload})
            state.isLoading = false;
        }
    }
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
