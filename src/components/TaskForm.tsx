import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Task from "../hooks/Types";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [task, setTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    completed: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = { ...task, id: Date.now().toString() };

    // Retrieve existing tasks from sessionStorage
    const storedTasks = sessionStorage.getItem("tasks");
    let tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

    // 🔹 Ensure the task is not a duplicate before adding
    if (!tasks.some((t) => t.title === newTask.title)) {
      tasks = [...tasks, newTask];
      sessionStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Reset form fields
    setTask({ title: "", description: "", completed: false });

    // Notify parent component
    onSubmit(newTask);
  };

  const clearSessionStorage = () => {
    sessionStorage.removeItem("tasks");
    setTask({ title: "", description: "", completed: false });
    alert("All tasks have been cleared.");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Enter task description"
            required
          />
        </Form.Group>

        <Row>
          <Col>
            <Button className="m-3" type="submit" variant="primary">
              Submit Task
            </Button>
          </Col>
          <Col>
            <Button
              className="m-3 float-right"
              type="button"
              onClick={clearSessionStorage}
              variant="danger"
            >
              Clear All Tasks
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default TaskForm;
