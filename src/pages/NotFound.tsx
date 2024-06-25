import React from "react";
import { Typography, Button, Container, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";


const NotFound: React.FC = () => {
    return (
        <Container>
            <StyledBox>
                <Typography variant="h1">
                    404
                </Typography>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Oops! The page you're looking for doesn't exist.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/"
                >
                    Go to Homepage
                </Button>
            </StyledBox>
        </Container>
    );
};

const StyledBox = styled(Box)(() => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}));


export default NotFound;