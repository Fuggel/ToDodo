import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Todo } from "../types/Todo";
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
            const index = state.todos.findIndex(todo => todo.id === action.payload);
            if (index !== -1) {
                const todo = state.todos[index];
                const repeatInterval = todo.repeatInterval;

                state.todos.splice(index, 1);

                if (repeatInterval) {
                    let nextDate: Dayjs | null = null;
                    switch (repeatInterval) {
                        case "minutely":
                            nextDate = dayjs(todo.startDate).add(1, "minute");
                            break;
                        case "daily":
                            nextDate = dayjs(todo.startDate).add(1, "day");
                            break;
                        case "weekly":
                            nextDate = dayjs(todo.startDate).add(1, "week");
                            break;
                        case "monthly":
                            nextDate = dayjs(todo.startDate).add(1, "month");
                            break;
                        case "yearly":
                            nextDate = dayjs(todo.startDate).add(1, "year");
                            break;
                        default:
                            break;
                    }

                    if (nextDate) {
                        const newTodo = { ...todo, hiddenUntil: nextDate.toISOString() };
                        state.hiddenTodos.push(newTodo);
                    }
                }
            }
        },

        permanentlyDeleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            state.hiddenTodos = state.hiddenTodos.filter(todo => todo.id !== action.payload);
        },

        checkHiddenTodos: (state) => {
            const now = dayjs();
            state.hiddenTodos = state.hiddenTodos.filter(todo => {
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
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                Object.assign(todo, updates);
            }
        },
    },
});


export const selectTodo = (state: RootState) => state.appView.todos;
export const selectTodoById = (state: RootState, id: string) => state.appView.todos.find(todo => todo.id === id) as Todo;
export const appViewActions = appViewSlice.actions;
export default appViewSlice.reducer;