import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { RepeatFrequency, Todo } from "../types/Todo";
import dayjs, { Dayjs } from "dayjs";


const initialAppViewState = {
    todos: [] as Todo[],
    hiddenTodos: [] as Todo[],
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

        deleteTodo: (state, action: PayloadAction<string>) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                const todo = state.todos[index];
                if (todo.repeat) {
                    state.hiddenTodos.push(todo);
                }
                state.todos.splice(index, 1);
            }
        },

        permanentlyDeleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            state.hiddenTodos = state.hiddenTodos.filter(todo => todo.id !== action.payload);
        },

        checkHiddenTodos: (state) => {
            const now = dayjs();
            state.hiddenTodos = state.hiddenTodos.filter((todo) => {
                const hiddenUntil = dayjs(todo.hiddenUntil);
                if (now.isAfter(hiddenUntil)) {
                    state.todos.push({ ...todo, hiddenUntil: undefined });
                    return false;
                }
                return true;
            });
        },

        updateTodo: (state, action: PayloadAction<Partial<Todo> & { id: string; }>) => {
            const { id, ...updates } = action.payload;
            const todoIndex = state.todos.findIndex((todo) => todo.id === id);
            if (todoIndex !== -1) {
                const todo = state.todos[todoIndex];
                const updatedTodo = {
                    ...todo,
                    ...updates,
                };

                if (updatedTodo.repeat?.frequency && updatedTodo.repeat?.interval) {
                    let nextDate: Dayjs | null = null;
                    const startDate = dayjs(updatedTodo.startDate);

                    switch (updatedTodo.repeat.frequency) {
                        case RepeatFrequency.Daily:
                            nextDate = startDate.add(updatedTodo.repeat.interval, "day");
                            break;
                        case RepeatFrequency.Weekly:
                            nextDate = startDate.add(updatedTodo.repeat.interval, "week");
                            break;
                        case RepeatFrequency.Monthly:
                            nextDate = startDate.add(updatedTodo.repeat.interval, "month");
                            break;
                        case RepeatFrequency.Yearly:
                            nextDate = startDate.add(updatedTodo.repeat.interval, "year");
                            break;
                        default:
                            break;
                    }

                    if (nextDate) {
                        updatedTodo.startDate = nextDate.toISOString();
                    }
                }

                state.todos[todoIndex] = updatedTodo;
            }
        },
    },
});


export const selectTodo = (state: RootState) => state.appView.todos;
export const selectTodoById = (state: RootState, id: string) => state.appView.todos.find(todo => todo.id === id) as Todo;
export const appViewActions = appViewSlice.actions;
export default appViewSlice.reducer;