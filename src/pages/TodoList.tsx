import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTodo, appViewActions } from "../store/appView";
import { Box, Divider, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../utils/date";
import LoopIcon from '@mui/icons-material/Loop';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { StyledBoxFlex, StyledBoxFlexBetween, StyledBoxFlexColumn, StyledDescription, StyledTitle, flexAlignCenterColumn } from "../styles";
import Card from "../components/ui/Card";
import dayjs from "dayjs";
import Icon from "../components/ui/Icon";


const TodoList: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const todos = useSelector(selectTodo);

    return (
        <Card>
            {todos.map((todo) => (
                <Box key={todo.id} sx={flexAlignCenterColumn}>
                    <StyledBoxFlexBetween>
                        <StyledBoxFlex>
                            <StyledTitle>{todo.task}</StyledTitle>

                            {todo.repeatInterval &&
                                <React.Fragment>
                                    <LoopIcon sx={{ color: "#888" }} />
                                    <StyledDescription>{todo.repeatInterval}</StyledDescription>
                                </React.Fragment>
                            }
                        </StyledBoxFlex>

                        <StyledBoxFlexColumn>
                            <StyledBoxFlex>
                                <ScheduleIcon sx={{ color: "#888" }} />
                                <StyledDescription>{formatTime(todo.startDate)} Uhr</StyledDescription>
                            </StyledBoxFlex>

                            {todo.endDate &&
                                <StyledBoxFlex>
                                    <AccessAlarmsIcon sx={{ color: dayjs().isAfter(todo.endDate) ? theme.palette.error.main : "#888" }} />
                                    <StyledDescription sx={{ color: dayjs().isAfter(todo.endDate) ? theme.palette.error.main : "#888" }}>
                                        {formatTime(todo.endDate)} Uhr
                                    </StyledDescription>
                                </StyledBoxFlex>
                            }
                        </StyledBoxFlexColumn>
                    </StyledBoxFlexBetween>

                    <StyledBoxFlexBetween>
                        <Box>
                            <Icon
                                label="Edit Task"
                                onClick={() => navigate(`/edit/${todo.id}`)}
                                icon={<EditIcon sx={{ fontSize: "2rem" }} />}
                            />
                            <Icon
                                label="Task Done"
                                onClick={() => dispatch(appViewActions.deleteTodo(todo.id))}
                                icon={<CheckCircleIcon sx={{ fontSize: "2rem" }} />}
                            />
                        </Box>

                        <Box>
                            {todo.repeatInterval &&
                                <Icon
                                    label="Delete Task"
                                    onClick={() => dispatch(appViewActions.permanentlyDeleteTodo(todo.id))}
                                    icon={<DeleteForeverIcon sx={{ fontSize: "2rem" }} />}
                                    type="caution"
                                />
                            }
                        </Box>
                    </StyledBoxFlexBetween>

                    <Divider />
                </Box>
            ))}
        </Card>
    );
};


export default TodoList;