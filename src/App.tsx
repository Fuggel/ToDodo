import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box, Container, ThemeProvider, Toolbar } from "@mui/material";
import { routeConfig } from "./config/routeConfig";
import { themeLight } from "./theme";
import Header from "./components/layouts/Header";
import { useDispatch } from "react-redux";
import { appViewActions } from "./store/appView";
import { StyledHeader } from "./styles";
import { headerConfig } from "./config/headerConfig";


const App: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const currRoute = headerConfig.find((r) => {
        if (r.path === "/edit") {
            return location.pathname.includes(r.path);
        }
        return r.path === location.pathname;
    });

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(appViewActions.checkHiddenTodos());
        }, 5000);

        return () => clearInterval(interval);
    }, [dispatch]);

    return (
        <Box>
            <Header />
            <Container maxWidth="xl">
                <ThemeProvider theme={themeLight}>
                    <Toolbar disableGutters>
                        <StyledHeader variant="h4">
                            {currRoute?.title}
                        </StyledHeader>
                    </Toolbar>

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
        </Box>
    );
};


export default App;