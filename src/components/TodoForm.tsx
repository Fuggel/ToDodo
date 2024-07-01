import React, { useEffect, useState } from "react";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";
import { useNavigate } from "react-router-dom";
import { StyledBoxFlex, StyledBoxFlexWrapper } from "../styles";
import Card from "./ui/Card";
import { RepeatFrequency } from "../types/Todo";
import { DATE_RANGES } from "../constants/date";
import Keyboard from 'react-simple-keyboard';
import "react-simple-keyboard/build/css/index.css";


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
    const [windowWitdh, setWindowWidth] = useState(window.innerWidth);

    const handleKeyPress = (button: string) => {
        if (button === "{enter}") {
            submitAction();
        }
    };

    useEffect(() => {
        if (startDate && endDate) {
            if (endDate.isBefore(startDate)) {
                setDateError("End date must be after start date");
            } else {
                setDateError(null);
            }
        }
    }, [startDate, endDate]);

    useEffect(() => {
        const updateWindowDimensions = () => {
            const newWidth = window.innerWidth;
            setWindowWidth(newWidth);
        };

        window.addEventListener("resize", updateWindowDimensions);

        return () => window.removeEventListener("resize", updateWindowDimensions);
    }, []);

    return (
        <Card>
            <StyledBoxFlexWrapper>
                <TextField
                    label="Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    multiline
                />
                {windowWitdh <= 750 &&
                    <Keyboard
                        onChange={(input) => setTask(input)}
                        onKeyPress={handleKeyPress}
                    />
                }
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    <DateTimePicker
                        disablePast
                        label="Start Date"
                        value={startDate}
                        minDate={dayjs()}
                        timeSteps={{ minutes: 1 }}
                        referenceDate={dayjs().startOf("minute").add(1, "minute")}
                        onChange={(date) => setStartDate && setStartDate(date as Dayjs)}
                    />

                    <StyledBoxFlex sx={{ mt: -2 }}>
                        {DATE_RANGES.map((range) => (
                            <Button
                                key={range.label}
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => setStartDate && setStartDate(range.getRange()[0])}
                            >
                                {range.label}
                            </Button>
                        ))}
                    </StyledBoxFlex>

                    <DateTimePicker
                        disablePast
                        label="End Date"
                        value={endDate}
                        minDate={startDate || dayjs()}
                        timeSteps={{ minutes: 1 }}
                        referenceDate={dayjs().startOf("minute").add(1, "minute")}
                        onChange={(date) => setEndDate && setEndDate(date as Dayjs)}
                    />

                    <StyledBoxFlex sx={{ mt: -2 }}>
                        {DATE_RANGES.map((range) => (
                            <Button
                                key={range.label}
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => setEndDate && setEndDate(range.getRange()[0])}
                            >
                                {range.label}
                            </Button>
                        ))}
                    </StyledBoxFlex>
                </LocalizationProvider>

                <TextField
                    type="number"
                    label="Repeat Interval"
                    disabled={!startDate}
                    value={repeatInterval || ""}
                    onChange={(e) => setRepeatInterval && setRepeatInterval(parseInt(e.target.value, 10))}
                    helperText="Every n times the task should be repeated. (e.g. 2 for every 2nd day)"
                    inputProps={{ min: 1 }}
                />

                <TextField
                    select
                    label="Repeat Frequency"
                    disabled={!startDate}
                    value={repeatFrequency || ""}
                    onChange={(e) => setRepeatFrequency && setRepeatFrequency(e.target.value as RepeatFrequency)}
                >
                    <MenuItem value={RepeatFrequency.Daily}>Daily</MenuItem>
                    <MenuItem value={RepeatFrequency.Weekly}>Weekly</MenuItem>
                    <MenuItem value={RepeatFrequency.Monthly}>Monthly</MenuItem>
                    <MenuItem value={RepeatFrequency.Yearly}>Yearly</MenuItem>
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