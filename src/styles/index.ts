import { Box, StyledComponentProps, SxProps, Typography, styled } from "@mui/material";


const flexAlignCenter: SxProps = {
    display: "flex",
    alignItems: "center",
};

export const flexAlignCenterColumn: SxProps = {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    my: 2,
};

export const StyledHeader = styled(Typography)(({ theme }) => ({
    fontSize: "2rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
}));

export const StyledBoxFlexBetween = styled(Box)(({ theme }) => ({
    ...flexAlignCenter as StyledComponentProps,
    justifyContent: "space-between",
}));

export const StyledBoxFlex = styled(Box)(({ theme }) => ({
    ...flexAlignCenter as StyledComponentProps,
    gap: "8px",
}));

export const StyledBoxFlexColumn = styled(Box)(({ theme }) => ({
    ...flexAlignCenter as StyledComponentProps,
    flexDirection: "column",
    gap: "4px",
}));

export const StyledBoxFlexWrapper = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    width: "75vw",
    margin: "40px auto",
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: theme.palette.text.primary,
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
    fontSize: "0.9rem",
    color: "#888"
}));

export const StyledCard = styled(Box)(({ theme }) => ({
    margin: "32px auto",
    backgroundColor: theme.palette.background.default,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    padding: "8px 16px",
    borderRadius: "8px",
}));

export const StyledDeleteBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    borderRadius: "6px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    padding: "32px",
    minWidth: "300px",
}));