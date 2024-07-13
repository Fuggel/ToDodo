import React, { useState } from "react";
import { Todo, TodoTab } from "../types/Todo";
import { appViewActions } from "../store/appView";
import { useDispatch } from "react-redux";
import { flexAlignCenterColumn, StyledBoxFlex, StyledBoxFlexBetween, StyledBoxFlexColumn, StyledDeleteBox, StyledDescription, StyledTitle } from "../styles";
import { Box, Button, Divider, Modal, useTheme } from "@mui/material";
import LoopIcon from '@mui/icons-material/Loop';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { displayedFrequency } from "../utils/displayFrequency";
import { formatTime } from "../utils/date";
import dayjs from "dayjs";
import Icon from "./ui/Icon";
import { useNavigate } from "react-router-dom";


interface Props {
    todo: Todo;
    tabValue: TodoTab;
}

const TodoListItem: React.FC<Props> = ({ todo, tabValue }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    return (
        <Box key={todo.id} sx={flexAlignCenterColumn}>
            <StyledBoxFlexBetween>
                <StyledBoxFlex>
                    <StyledTitle>{todo.task}</StyledTitle>

                    {todo.repeat && (
                        <React.Fragment>
                            <LoopIcon sx={{ color: "#888" }} />
                            <StyledDescription>{displayedFrequency(todo)}</StyledDescription>
                        </React.Fragment>
                    )}
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
                {tabValue !== TodoTab.HIDDEN &&
                    <Icon
                        label="Task Done"
                        onClick={() => dispatch(appViewActions.deleteTodo(todo.id))}
                        icon={<CheckCircleIcon sx={{ fontSize: "2.5rem" }} />}
                    />
                }

                <Box>
                    <Icon
                        label="Edit Task"
                        onClick={() => navigate(`/edit/${todo.id}`)}
                        icon={<EditIcon sx={{ fontSize: "2.5rem" }} />}
                    />
                    {todo.repeat && (
                        <Icon
                            label="Delete Task"
                            onClick={() => setShowModal(true)}
                            icon={<DeleteForeverIcon sx={{ fontSize: "2.5rem" }} />}
                            type="caution"
                        />
                    )}
                </Box>
            </StyledBoxFlexBetween>

            <Divider />
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
            >
                <StyledDeleteBox>
                    <StyledTitle variant="h6" sx={{ fontSize: "1.2rem", mb: 1, color: "#ff0000" }}>
                        Delete Task
                    </StyledTitle>
                    <StyledDescription sx={{ fontSize: "1rem", mb: 3 }}>
                        Are you sure you want to delete this task?
                    </StyledDescription>

                    <StyledBoxFlexBetween>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: "#888", "&:hover": { bgcolor: "#777" } }}
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="error"
                            variant="contained"
                            onClick={() => {
                                dispatch(appViewActions.permanentlyDeleteTodo(todo.id));
                                setShowModal(false);
                            }}
                        >
                            Delete
                        </Button>
                    </StyledBoxFlexBetween>
                </StyledDeleteBox>
            </Modal>
        </Box>
    );
};


export default TodoListItem;