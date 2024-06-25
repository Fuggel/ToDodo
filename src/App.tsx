import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container, ThemeProvider } from "@mui/material";
import { routeConfig } from "./config/routeConfig";
import { themeLight } from "./theme";
import Header from "./components/layouts/Header";


const App: React.FC = () => {
    return (
        <Container maxWidth="xl">
            <ThemeProvider theme={themeLight}>
                <Header />
                <Routes>
                    {routeConfig.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={<route.element {...route.props} />}
                        />
                    ))}
                </Routes>
            </ThemeProvider>
        </Container>
    );
};


export default App;