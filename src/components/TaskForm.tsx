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
    onSubmit({ ...task, id: Date.now().toString() });
    setTask({ title: "", description: "", completed: false }); // Reset form fields
  };

  const saveToSessionStorage = () => {
    if (task.title.trim() !== "" || (task.description && task.description.trim() !== "")) {
      sessionStorage.setItem(
        "task",
        JSON.stringify(task)
      );
      console.log(`Stored task: ${JSON.stringify(task)}`);
      alert("Task saved to session storage!");
    } else {
      alert("Please fill in the task title or description.");
    }
  };

  const clearSessionStorage = () => {
    sessionStorage.clear();
    console.log("Session Storage cleared.");
    alert("Session Storage cleared.");
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
            <Button
              className="m-3"
              type="submit"
              variant="primary"
            >
              Submit Task
            </Button>
            <Button
              className="m-3"
              type="button"
              onClick={saveToSessionStorage}
              variant="success"
            >
              Save to Session Storage
            </Button>
          </Col>
          <Col>
            <Button
              className="m-3 float-right"
              type="button"
              onClick={clearSessionStorage}
              variant="danger"
            >
              Clear Session Storage
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default TaskForm;
