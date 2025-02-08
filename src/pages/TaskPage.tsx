import React from "react";
import { Container } from "react-bootstrap";
import Task from "../hooks/Types";
import TaskForm from "../components/TaskForm";

const TaskPage: React.FC = () => {
  const handleTaskSubmit = (task: Task) => {
    console.log("Task Submitted:", task);

    const storedTasks = sessionStorage.getItem("tasks");
    const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

    if (!tasks.some((t) => t.id === task.id)) {
      const updatedTasks = [...tasks, task];
      sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  return (
    <Container className="mt-5">
      <h1>Create a New Task</h1>
      <TaskForm onSubmit={handleTaskSubmit} />
    </Container>
  );
};

export default TaskPage;