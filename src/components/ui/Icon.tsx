import React from "react";
import { IconButton, Tooltip, useTheme } from "@mui/material";


interface Props {
    label: string;
    onClick: () => void;
    icon: React.ReactNode;
    type?: "cta" | "caution";
}

const Icon: React.FC<Props> = ({ label, onClick, icon, type }) => {
    const theme = useTheme();
    let color = "";

    switch (type) {
        case "cta":
            color = theme.palette.primary.main;
            break;
        case "caution":
            color = theme.palette.error.main;
            break;
        default:
            color = theme.palette.primary.main;
    }

    return (
        <Tooltip title={label} arrow placement="top">
            <IconButton sx={{ color }} onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>

    );
};


export default Icon;