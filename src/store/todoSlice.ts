import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ITodo} from "../api/dto/ITodo";

const initialState: { todos: ITodo[] } = {
    todos: []
};

const todoSlice = createSlice({
    name: "todosData",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<ITodo>) {
            state.todos.push(action.payload);
        },
        toggleCompleteTodo(state, action: PayloadAction<number>) {
            const toggledTodo = state.todos.find(
              (todo) => todo.id === action.payload
            );
            // @ts-ignore
            toggledTodo.completed = !toggledTodo.completed;
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        }
    }
});

export const { addTodo, toggleCompleteTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
