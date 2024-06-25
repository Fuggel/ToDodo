import React from "react";
import { useSelector } from "react-redux";
import { selectTodo } from "../store/appView";
import { Box } from "@mui/material";


const TodoList: React.FC = () => {
    const todos = useSelector(selectTodo);

    return (
        <Box>
            {todos.map((todo) => (
                <Box key={todo.id}>
                    <p>{todo.task}</p>
                    <p>{todo.startDate}</p>
                    <p>{todo.endDate}</p>
                    <p>{todo.repeatTask}</p>
                </Box>
            ))}
        </Box>
    );
};


export default TodoList;