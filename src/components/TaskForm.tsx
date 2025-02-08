import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Card, Alert } from "react-bootstrap";
import Task from "../hooks/Types";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialTask?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask }) => {
  const [task, setTask] = useState<Omit<Task, "id">>({
    title: initialTask?.title || "",
    description: initialTask?.description || "",
    completed: initialTask?.completed || false,
  });
  const [showMessage, setShowMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialTask) {
      setTask({ title: initialTask.title, description: initialTask.description || "", completed: initialTask.completed });
    }
  }, [initialTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = initialTask ? { ...initialTask, ...task } : { ...task, id: Date.now().toString() };

    const storedTasks = sessionStorage.getItem("tasks");
    let tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

    if (initialTask) {
      tasks = tasks.map((t) => (t.id === initialTask.id ? newTask : t));
      setShowMessage("Task successfully updated!");
    } else {
      tasks.push(newTask);
      setShowMessage("Task successfully added!");
    }

    sessionStorage.setItem("tasks", JSON.stringify(tasks));
    setTask({ title: "", description: "", completed: false });
    onSubmit(newTask);

    // Hide the success message after 3 seconds
    setTimeout(() => setShowMessage(null), 3000);
  };

  return (
    <Container>
      <Card className="shadow-lg p-4 border-success bg-light">
        <Card.Title className="text-success text-center">
          {initialTask ? "Edit Task" : "Add a New Task"}
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="fw-bold text-success">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
              className="mb-3 shadow-sm"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold text-success">Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Enter task description"
              required
              className="mb-3 shadow-sm"
            />
          </Form.Group>

          <Row>
            <Col className="text-center">
              <Button className="px-4 py-2 fw-bold shadow-sm rounded-pill" type="submit" variant="success">
                {initialTask ? "Update Task" : "Add Task"}
              </Button>
            </Col>
          </Row>
        </Form>
        {showMessage && (
          <Alert variant="success" className="mt-3 text-center">
            {showMessage}
          </Alert>
        )}
      </Card>
    </Container>
  );
};

export default TaskForm;
