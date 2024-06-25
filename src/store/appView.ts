import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Todo } from "../types/Todo";


const initialAppViewState = {
    todos: [] as Todo[],
};

const appViewSlice = createSlice({
    name: "appView",
    initialState: initialAppViewState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo[]>) => {
            if (!state.todos) {
                state.todos = [];
            }

            state.todos.push(...action.payload);
        },
        removeTodo: (state, action: PayloadAction<Todo[]>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload[0].id);
        },
    },
});


export const selectTodo = (state: RootState) => state.appView.todos;
export const appViewActions = appViewSlice.actions;
export default appViewSlice.reducer;