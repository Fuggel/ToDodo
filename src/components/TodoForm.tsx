import React, { useEffect, useState } from "react";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";
import { useNavigate } from "react-router-dom";
import { StyledBoxFlex, StyledBoxFlexWrapper } from "../styles";
import Card from "./ui/Card";


interface Props {
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    buttonAction: string;
    startDate?: Dayjs | null;
    setStartDate?: React.Dispatch<React.SetStateAction<Dayjs | null>>;
    endDate?: Dayjs | null;
    setEndDate?: React.Dispatch<React.SetStateAction<Dayjs | null>>;
    repeatInterval?: string | null;
    setRepeatInterval?: React.Dispatch<React.SetStateAction<string | null>>;
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
                        label="Start Date"
                        value={startDate}
                        onChange={(date) => setStartDate && setStartDate(date as Dayjs)}
                        disablePast
                    />
                    <DateTimePicker
                        label="End Date"
                        value={endDate}
                        onChange={(date) => setEndDate && setEndDate(date as Dayjs)}
                        disablePast
                    />
                </LocalizationProvider>


                <TextField
                    select
                    label="Repeat Interval"
                    value={repeatInterval || ""}
                    onChange={(e) => setRepeatInterval && setRepeatInterval(e.target.value)}
                >
                    <MenuItem value="minutely">Minutely</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                </TextField>

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