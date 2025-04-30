import React, { useState, useEffect, useCallback } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getTasks, updateTask } from "../../API/TasksApi";
import "./TaskList.scss";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskList: React.FC = React.memo(() => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleToggleComplete = async (taskId: number) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const newCompleted = !task.completed;

      // Оптимистичное обновление
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, completed: newCompleted } : t
        )
      );

      await updateTask(taskId, newCompleted);
    } catch (error) {
      console.error("Update failed:", error);
      // Откат изменений
      setTasks([...tasks]);
    }
  };

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Не удалось загрузить задачи");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!tasks.length) {
    return <Typography>Нет задач</Typography>;
  }

  return (
    <List className="taskList">
      {tasks.map((task) => (
        <ListItem key={task.id} className="taskList__item">
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
              tabIndex={-1}
              disableRipple
              className="taskList__checkbox"
            />
          </ListItemIcon>
          <ListItemText
            primary={task.title}
            className={`taskList__text ${
              task.completed ? "taskList__text_completed" : ""
            }`}
          />
        </ListItem>
      ))}
    </List>
  );
});

export default TaskList;
