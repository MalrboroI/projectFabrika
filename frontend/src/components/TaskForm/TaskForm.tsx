import React, { useState, useCallback } from "react";
import { createTask } from "../../API/TasksApi";
import { TextField, Button, Box, Alert } from "@mui/material";
import "./TaskForm.scss";

interface TaskFormProps {
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = React.memo(({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim()) return;

      setIsSubmitting(true);
      setError(null);
      try {
        await createTask(title);
        setTitle("");
        onTaskAdded();
      } finally {
        setIsSubmitting(false);
      }
    },
    [title, onTaskAdded]
  );

  return (
    <Box component="form" onSubmit={handleSubmit} className="task-form">
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        fullWidth
        variant="outlined"
        label="Название задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-form__input"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting || !title.trim()}
        className="task-form__button"
      >
        {isSubmitting ? "Добавление..." : "Добавить"}
      </Button>
    </Box>
  );
});

export default TaskForm;
