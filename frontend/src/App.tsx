import React, { useState, useCallback } from "react";
import { Container, Typography, Paper } from "@mui/material";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import "./globalStyles/App.scss";

const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskAdded = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "24px", marginTop: "24px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Список задач
        </Typography>
        <TaskForm onTaskAdded={handleTaskAdded} />
        <TaskList key={refreshKey} />
      </Paper>
    </Container>
  );
};

export default App;
