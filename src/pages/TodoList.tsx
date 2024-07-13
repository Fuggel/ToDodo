import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectHiddenTodos, selectTodo } from "../store/appView";
import { StyledTitle } from "../styles";
import Card from "../components/ui/Card";
import TodoListItem from "../components/TodoListItem";
import { TodoTab } from "../types/Todo";
import { Tab, Tabs } from "@mui/material";


const TodoList: React.FC = () => {
    const todos = useSelector(selectTodo);
    const hiddenTodos = useSelector(selectHiddenTodos);
    const [tabValue, setTabValue] = useState(TodoTab.BASIC);
    const isTabBasic = tabValue === TodoTab.BASIC;
    const isTabHidden = tabValue === TodoTab.HIDDEN;

    return (
        <React.Fragment>
            <Tabs
                value={tabValue}
                textColor="inherit"
                onChange={(_, newVal) => setTabValue(newVal)}
            >
                <Tab label="Todo List" />
                <Tab label="Repeated Todos" />
            </Tabs>

            <Card>
                {isTabBasic && todos.map((todo) => (
                    <TodoListItem
                        key={todo.id}
                        todo={todo}
                        tabValue={tabValue}
                    />
                ))}
                {isTabHidden && hiddenTodos.map((todo) => (
                    <TodoListItem
                        key={todo.id}
                        todo={todo}
                        tabValue={tabValue}
                    />
                ))}
                {((isTabBasic && todos.length === 0) || (isTabHidden && hiddenTodos.length) === 0) && (
                    <StyledTitle sx={{ textAlign: "center", my: 2 }}>No tasks left. 🥳</StyledTitle>
                )}
            </Card>
        </React.Fragment>
    );
};


export default TodoList;