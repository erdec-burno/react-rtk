import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ITodo} from "../api/dto/ITodo";

const initialState: { todos: ITodo[] } = {
    todos: []
};

const todoSlice = createSlice({
    name: "todosData",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.todos.push({
                id: new Date().toISOString(),
                title: action.payload,
                completed: false
            });
        },
        toggleCompleteTodo(state, action: PayloadAction<string>) {
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
