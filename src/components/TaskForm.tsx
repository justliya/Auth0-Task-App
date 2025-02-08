import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Task from "../hooks/Types";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialTask?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask }) => {
  const [task, setTask] = useState<Omit<Task, "id">>(
    initialTask || { title: "", description: "", completed: false }
  );

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
    } else {
      tasks.push(newTask);
    }

    sessionStorage.setItem("tasks", JSON.stringify(tasks));
    setTask({ title: "", description: "", completed: false });
    onSubmit(newTask);
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
              {initialTask ? "Update Task" : "Submit Task"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default TaskForm;