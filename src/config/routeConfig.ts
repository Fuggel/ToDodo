import React from "react";
import TodoList from "../pages/TodoList";
import AddTodo from "../pages/AddTodo";
import EditTodo from "../pages/EditTodo";
import NotFound from "../pages/NotFound";


interface RouteConfig {
    path: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    element: React.ComponentType<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props?: any;
}

export const routeConfig: RouteConfig[] = [
    {
        path: "/",
        element: TodoList,
    },
    {
        path: "/add",
        element: AddTodo,
    },
    {
        path: "/edit/:id",
        element: EditTodo,
    },
    {
        path: "*",
        element: NotFound,
    },
];