import React, { useEffect, useState } from "react";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";
import { useNavigate } from "react-router-dom";
import { StyledBoxFlex, StyledBoxFlexWrapper } from "../styles";
import Card from "./ui/Card";
import { RepeatFrequency } from "../types/Todo";


interface Props {
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    buttonAction: string;
    startDate?: Dayjs | null;
    setStartDate?: React.Dispatch<React.SetStateAction<Dayjs | null>>;
    endDate?: Dayjs | null;
    setEndDate?: React.Dispatch<React.SetStateAction<Dayjs | null>>;
    repeatFrequency?: RepeatFrequency | undefined;
    setRepeatFrequency?: React.Dispatch<React.SetStateAction<RepeatFrequency | undefined>>;
    repeatInterval?: number | undefined;
    setRepeatInterval?: React.Dispatch<React.SetStateAction<number | undefined>>;
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
    repeatFrequency,
    setRepeatFrequency,
    repeatInterval,
    setRepeatInterval,
    submitAction,
}) => {
    const navigate = useNavigate();
    const [dateError, setDateError] = useState<string | null>(null);

    useEffect(() => {
        if (startDate && endDate) {
            if (endDate.isBefore(startDate)) {
                setDateError("End date must be after start date");
            } else {
                setDateError(null);
            }
        }
    }, [startDate, endDate]);

    return (
        <Card>
            <StyledBoxFlexWrapper>
                <TextField
                    label="Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    multiline
                />
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    <DateTimePicker
                        disablePast
                        label="Start Date"
                        value={startDate}
                        onChange={(date) => setStartDate && setStartDate(date as Dayjs)}
                    />
                    <DateTimePicker
                        disablePast
                        label="End Date"
                        value={endDate}
                        onChange={(date) => setEndDate && setEndDate(date as Dayjs)}
                    />
                </LocalizationProvider>

                {startDate &&
                    <React.Fragment>
                        <TextField
                            select
                            label="Repeat Frequency"
                            value={repeatFrequency || ""}
                            onChange={(e) => setRepeatFrequency && setRepeatFrequency(e.target.value as RepeatFrequency)}
                        >
                            <MenuItem value={RepeatFrequency.Daily}>Daily</MenuItem>
                            <MenuItem value={RepeatFrequency.Weekly}>Weekly</MenuItem>
                            <MenuItem value={RepeatFrequency.Monthly}>Monthly</MenuItem>
                            <MenuItem value={RepeatFrequency.Yearly}>Yearly</MenuItem>
                        </TextField>

                        <TextField
                            type="number"
                            label="Repeat Interval"
                            value={repeatInterval || ""}
                            onChange={(e) => setRepeatInterval && setRepeatInterval(parseInt(e.target.value, 10))}
                            helperText="Every n times the task should repeated. (e.g. 2 for every 2nd day)"
                        />
                    </React.Fragment>
                }

                {dateError && <Typography variant="body2" color="red">{dateError}</Typography>}

                <StyledBoxFlex>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submitAction}
                        disabled={!task || !!dateError}
                    >
                        {buttonAction} Task
                    </Button>
                </StyledBoxFlex>
            </StyledBoxFlexWrapper>
        </Card>
    );
};


export default TodoForm;