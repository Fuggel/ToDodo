import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { appViewActions, selectTodoById } from "../store/appView";
import { RepeatFrequency, Todo } from "../types/Todo";
import { useParams, useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import dayjs, { Dayjs } from "dayjs";


const EditTodo: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string; }>();
    const todo: Todo = useSelector((state: RootState) => selectTodoById(state, id as string));
    const [task, setTask] = useState(todo?.task);
    const [startDate, setStartDate] = useState<Dayjs | null>(todo?.startDate ? dayjs(todo.startDate) : null);
    const [endDate, setEndDate] = useState<Dayjs | null>(todo?.endDate ? dayjs(todo.endDate) : null);
    const [repeatFrequency, setRepeatFrequency] = useState<RepeatFrequency | undefined>(todo?.repeat?.frequency);
    const [repeatInterval, setRepeatInterval] = useState(todo?.repeat?.interval);

    useEffect(() => {
        if (todo) {
            setTask(todo.task);
            setStartDate(todo.startDate ? dayjs(todo.startDate) : null);
            setEndDate(todo.endDate ? dayjs(todo.endDate) : null);
            setRepeatFrequency(todo.repeat?.frequency);
            setRepeatInterval(todo.repeat?.interval);
        }
    }, [todo, setTask, setStartDate, setEndDate, setRepeatFrequency, setRepeatInterval]);

    const handleSave = () => {
        if (todo) {
            const updatedTodo: Partial<Todo> & { id: string; } = { id: todo.id };

            if (task !== todo.task) updatedTodo.task = task;
            if (startDate && startDate.toISOString() !== todo.startDate) updatedTodo.startDate = startDate.toISOString();
            if (endDate && endDate.toISOString() !== todo.endDate) updatedTodo.endDate = endDate.toISOString();
            if (repeatFrequency !== todo.repeat?.frequency || repeatInterval !== todo.repeat?.interval) {
                updatedTodo.repeat = {
                    frequency: repeatFrequency,
                    interval: repeatInterval,
                };
            }

            dispatch(appViewActions.updateTodo(updatedTodo));
            navigate("/");
        }
    };

    return (
        <TodoForm
            task={task}
            setTask={setTask}
            buttonAction="Save"
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            repeatFrequency={repeatFrequency}
            setRepeatFrequency={setRepeatFrequency}
            repeatInterval={repeatInterval}
            setRepeatInterval={setRepeatInterval}
            submitAction={handleSave}
        />
    );
};


export default EditTodo;