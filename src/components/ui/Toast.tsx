import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";


interface Props {
    msg: string;
    type?: "success" | "error" | "info" | "warning";
    hideDuration?: number;
}

const Toast: React.FC<Props> = ({ msg, type, hideDuration }) => {
    const [open, setOpen] = useState(true);

    return (
        <Snackbar open={open} autoHideDuration={hideDuration || 2000} onClose={() => setOpen(false)}>
            <Alert
                variant="filled"
                severity={type || "success"}
                onClose={() => setOpen(false)}
            >
                {msg}
            </Alert>
        </Snackbar>
    );
};


export default Toast;