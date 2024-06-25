import React from "react";
import { Box, IconButton, Toolbar, Typography, styled } from "@mui/material";
import { headerConfig } from "../../config/headerConfig";
import { Link, useLocation } from "react-router-dom";
import { Home } from "@mui/icons-material";


const Header: React.FC = () => {
    const location = useLocation();
    const currRoute = headerConfig.find((r) => r.path === location.pathname);

    return (
        <Box sx={{ mt: "1rem" }}>
            <StyledBox>
                <Link to="/">
                    <IconButton>
                        <Home sx={{ fontSize: "2rem" }} />
                    </IconButton>
                </Link>

                <Link to="/add">
                    <Typography variant="subtitle1" component="p">
                        Add ToDo
                    </Typography>
                </Link>
            </StyledBox>

            <Toolbar disableGutters>
                <Typography variant="h4" component="h1">
                    {currRoute?.title}
                </Typography>
            </Toolbar>
        </Box>
    );
};

const StyledBox = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
}));


export default Header;