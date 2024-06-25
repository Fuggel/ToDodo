interface HeaderConfig {
    path: string;
    title: string;
}

export const headerConfig: HeaderConfig[] = [
    { path: "/", title: "Home" },
    { path: "/add", title: "Add Task" },
    { path: "/edit", title: "Edit Task" },
];