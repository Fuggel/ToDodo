import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { appViewActions, selectTodoById } from "../store/appView";
import { Todo } from "../types/Todo";
import { useParams, useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import Toast from "../components/ui/Toast";
import dayjs, { Dayjs } from "dayjs";


const EditTodo: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string; }>();
    const todo: Todo = useSelector((state: RootState) => selectTodoById(state, id as string));
    const [showToast, setShowToast] = useState(false);
    const [task, setTask] = useState(todo.task);
    const [startDate, setStartDate] = useState<Dayjs | null>(todo?.startDate ? dayjs(todo.startDate) : null);
    const [endDate, setEndDate] = useState<Dayjs | null>(todo?.endDate ? dayjs(todo.endDate) : null);
    const [repeatInterval, setRepeatInterval] = useState<string | null>(todo.repeatInterval ?? null);

    useEffect(() => {
        if (todo) {
            setTask(todo.task);
            setStartDate(todo.startDate ? dayjs(todo.startDate) : null);
            setEndDate(todo.endDate ? dayjs(todo.endDate) : null);
            setRepeatInterval(todo.repeatInterval);
        }
    }, [todo, setTask, setStartDate, setEndDate, setRepeatInterval]);

    const handleSave = () => {
        if (todo) {
            const updatedTodo: Partial<Todo> & { id: string; } = { id: todo.id };

            if (task !== todo.task) updatedTodo.task = task;
            if (startDate && startDate.toISOString() !== todo.startDate) updatedTodo.startDate = startDate.toISOString();
            if (endDate && endDate.toISOString() !== todo.endDate) updatedTodo.endDate = endDate.toISOString();
            if (repeatInterval !== todo.repeatInterval) updatedTodo.repeatInterval = repeatInterval;

            dispatch(appViewActions.updateTodo(updatedTodo));
            setShowToast(true);

            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    };

    return (
        <React.Fragment>
            <TodoForm
                task={task}
                setTask={setTask}
                buttonAction="Save"
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                repeatInterval={repeatInterval}
                setRepeatInterval={setRepeatInterval}
                submitAction={handleSave}
            />
            {showToast &&
                <Toast msg="Todo updated successfully!" />
            }
        </React.Fragment>
    );
};


export default EditTodo;