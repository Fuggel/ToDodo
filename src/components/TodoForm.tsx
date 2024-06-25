import React from "react";
import { Box, Button, TextField, styled } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";


interface Props {
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    buttonAction: string;
    startDate?: Dayjs;
    setStartDate?: React.Dispatch<React.SetStateAction<Dayjs | undefined>>;
    endDate?: Dayjs;
    setEndDate?: React.Dispatch<React.SetStateAction<Dayjs | undefined>>;
    repeatTask?: Dayjs;
    setRepeatTask?: React.Dispatch<React.SetStateAction<Dayjs | undefined>>;
    submitAction: () => void;
}

const TodoForm: React.FC<Props> = ({
    task,
    setTask,
    buttonAction,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    repeatTask,
    setRepeatTask,
    submitAction,
}) => {
    return (
        <StyledBox>
            <TextField
                label="Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                multiline
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                <DateTimePicker
                    label="Start Date"
                    value={startDate ?? dayjs()}
                    onChange={(date) => setStartDate && setStartDate(date as Dayjs)}
                    disablePast
                />
                <DateTimePicker
                    label="End Date"
                    value={endDate ?? dayjs()}
                    onChange={(date) => setEndDate && setEndDate(date as Dayjs)}
                    disablePast
                />
                <DateTimePicker
                    label="Repeat Task"
                    value={repeatTask ?? dayjs()}
                    onChange={(date) => setRepeatTask && setRepeatTask(date as Dayjs)}
                    disablePast
                />
            </LocalizationProvider>

            <Button variant="contained" color="primary" onClick={submitAction}>
                {buttonAction} Task
            </Button>
        </StyledBox>
    );
};

const StyledBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    width: "75vw",
    margin: "80px auto",
}));


export default TodoForm;