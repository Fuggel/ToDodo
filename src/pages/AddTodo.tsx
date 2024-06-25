import { Box } from "@mui/material";
import React, { useState } from "react";
import TodoForm from "../components/TodoForm";
import { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { appViewActions } from "../store/appView";
import { Todo } from "../types/Todo";


const AddTodo: React.FC = () => {
    const dispatch = useDispatch();
    const [task, setTask] = useState("");
    const [startDate, setStartDate] = useState<Dayjs | undefined>(undefined);
    const [endDate, setEndDate] = useState<Dayjs | undefined>(undefined);
    const [repeatTask, setRepeatTask] = useState<Dayjs | undefined>(undefined);


    const handleAddTodo = () => {
        const todo: Todo = {
            id: Math.random().toString(36).substr(2, 9),
            task,
            startDate: startDate?.toISOString() ?? "",
            endDate: endDate?.toISOString() ?? "",
            repeatTask: repeatTask?.toISOString() ?? "",
        };

        dispatch(appViewActions.addTodo([todo]));
    };

    return (
        <Box>
            <TodoForm
                task={task}
                setTask={setTask}
                buttonAction="Add"
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                repeatTask={repeatTask}
                setRepeatTask={setRepeatTask}
                submitAction={handleAddTodo}
            />
        </Box>
    );
};


export default AddTodo;