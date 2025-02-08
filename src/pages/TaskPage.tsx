// TaskPage.tsx
import React from "react";
import { Container } from "react-bootstrap";
import TaskForm from "../components/TaskForm";

const TaskPage: React.FC = () => {
  return (
    <Container className="mt-5">
      <h1>Create a New Task</h1>
      <TaskForm onSubmit={(task) => console.log("Task Submitted:", task)} />
    </Container>
  );
};

export default TaskPage;
