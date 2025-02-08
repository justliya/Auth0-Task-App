import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Task from "../hooks/Types";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [task, setTask] = useState<Omit<Task, "id">>(
    () => {
      const savedTask = sessionStorage.getItem("task");
      return savedTask ? JSON.parse(savedTask) : { title: "", description: "", completed: false };
    }
  );

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
    sessionStorage.removeItem("task"); // Clear session storage after submission
  };

  useEffect(() => {
    sessionStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  const clearSessionStorage = () => {
    sessionStorage.removeItem("task");
    setTask({ title: "", description: "", completed: false });
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
            <Button className="m-3" type="submit" variant="primary">
              Submit Task
            </Button>
          </Col>
          <Col>
            <Button className="m-3 float-right" type="button" onClick={clearSessionStorage} variant="danger">
              Clear All Task
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default TaskForm;
