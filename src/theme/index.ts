import { createTheme } from "@mui/material";


export const themeLight = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#007AFF",
        },
        secondary: {
            main: "#FF2D55",
        },
        text: {
            primary: "#333",
            secondary: "#666",
        },
        background: {
            default: "#F9F9F9",
            paper: "#FFFFFF",
        },
    },
});

export const themeDark = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#0A84FF",
        },
        secondary: {
            main: "#FF375F",
        },
        text: {
            primary: "#F2F2F7",
            secondary: "#B0B0B0",
        },
        background: {
            default: "#1C1C1E",
            paper: "#2C2C2E",
        },
    },
});
