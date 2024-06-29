import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTodo, appViewActions } from "../store/appView";
import { Box, Divider, IconButton, Tooltip, useTheme } from "@mui/material";
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
                                    <AccessAlarmsIcon sx={{ color: dayjs().isAfter(todo.endDate) ? "#ff0000" : "#888" }} />
                                    <StyledDescription sx={{ color: dayjs().isAfter(todo.endDate) ? "#ff0000" : "#888" }}>
                                        {formatTime(todo.endDate)} Uhr
                                    </StyledDescription>
                                </StyledBoxFlex>
                            }
                        </StyledBoxFlexColumn>
                    </StyledBoxFlexBetween>

                    <StyledBoxFlexBetween>
                        <Box>
                            <Tooltip title={"Edit Task"} arrow placement="top">
                                <IconButton sx={{ color: theme.palette.primary.main }} onClick={() => navigate(`/edit/${todo.id}`)}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Task Done"} arrow placement="top">
                                <IconButton sx={{ color: theme.palette.primary.main }} onClick={() => dispatch(appViewActions.deleteTodo(todo.id))}>
                                    <CheckCircleIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Box>
                            {todo.repeatInterval &&
                                <Tooltip title={"Delete Task Forever"} arrow placement="top">
                                    <IconButton sx={{ color: "#ff0000" }} onClick={() => dispatch(appViewActions.permanentlyDeleteTodo(todo.id))}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Tooltip>
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