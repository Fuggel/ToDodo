import React from "react";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { StyledBoxFlexBetween } from "../../styles";


const Header: React.FC = () => {
    const theme = useTheme();

    return (
        <Box sx={{ mt: "1rem" }}>
            <StyledBoxFlexBetween sx={{ px: 2, py: 1 }}>
                <Link to="/">
                    <Tooltip title={"Home"} arrow>
                        <IconButton>
                            <Home sx={{ color: theme.palette.primary.main, fontSize: "2.5rem" }} />
                        </IconButton>
                    </Tooltip>
                </Link>

                <Link to="/add">
                    <Tooltip title={"Add New Task"} arrow>
                        <IconButton>
                            <AddCircleIcon sx={{ color: theme.palette.primary.main, fontSize: "2.5rem" }} />
                        </IconButton>
                    </Tooltip>
                </Link>
            </StyledBoxFlexBetween>
        </Box>
    );
};


export default Header;