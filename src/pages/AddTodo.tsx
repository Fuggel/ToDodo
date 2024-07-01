import React, { useState } from "react";
import TodoForm from "../components/TodoForm";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { appViewActions } from "../store/appView";
import { RepeatFrequency, Todo } from "../types/Todo";
import { useNavigate } from "react-router-dom";


const AddTodo: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [task, setTask] = useState("");
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [repeatFrequency, setRepeatFrequency] = useState<RepeatFrequency | undefined>(undefined);
    const [repeatInterval, setRepeatInterval] = useState<number | undefined>(undefined);

    const handleAddTodo = () => {
        if (!task) return;

        const todo: Todo = {
            id: Math.random().toString(36).substr(2, 9),
            task,
            startDate: startDate?.toISOString() ?? dayjs().toISOString(),
            endDate: endDate?.toISOString() ?? "",
            repeat: repeatFrequency ? { frequency: repeatFrequency, interval: repeatInterval } : undefined,
        };

        dispatch(appViewActions.addTodo([todo]));
        navigate("/");
    };

    return (
        <TodoForm
            task={task}
            setTask={setTask}
            buttonAction="Add"
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            repeatFrequency={repeatFrequency}
            setRepeatFrequency={setRepeatFrequency}
            repeatInterval={repeatInterval}
            setRepeatInterval={setRepeatInterval}
            submitAction={handleAddTodo}
        />
    );
};


export default AddTodo;