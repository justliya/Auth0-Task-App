import React, { useState, useEffect } from "react";
import { Col, Container, ListGroup, Badge, Button, Alert, Card } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import TaskForm from "../components/TaskForm";
import LoginButton from "../components/LoginButton";
import RegisterButton from "../components/RegisterButton";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedTasks = sessionStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (err) {
      console.error("Error loading tasks from session storage:", err);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskSubmit = (task: Task) => {
    try {
      if (editingTask) {
        handleTaskEdit(task);
      } else {
        setTasks((prevTasks) => [...prevTasks, task]);
      }
      setEditingTask(null);
      setError(null);
    } catch (err) {
      console.error("Error occurred while submitting the task:", err);
      setError("Failed to submit the task. Please try again.");
    }
  };

  const handleTaskEdit = (updatedTask: Task) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setError(null);
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update the task. Please try again.");
    }
  };
  
  const handleTaskDelete = (taskId: string) => {
    try {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
        sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      setError(null);
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete the task. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <Col>
        <h1 className="text-success">Task Manager Dashboard</h1>
        {!isAuthenticated ? (
          <>
            <p className="text-muted">Login or Register to manage your tasks efficiently.</p>
            <LoginButton />
            <RegisterButton />
          </>
        ) : (
          <>
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}
            <Alert variant="success" className="text-center">
              Welcome, <strong>{user?.name}</strong>! Organize your tasks below.
            </Alert>
            <TaskForm onSubmit={handleTaskSubmit} initialTask={editingTask || undefined} />
            <h2 className="mt-4 text-success">Your Tasks</h2>
            {tasks.length > 0 ? (
              <ListGroup>
                {tasks.map((task) => (
                  <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
                    <Card className="w-100 p-3 shadow-sm border-success">
                      <Card.Body>
                        <Card.Title className="d-flex justify-content-between align-items-center">
                          <span>{task.title}</span>
                          <Badge bg={task.completed ? "success" : "warning"}>
                            {task.completed ? "Completed" : "Pending"}
                          </Badge>
                        </Card.Title>
                        <Card.Text>{task.description}</Card.Text>
                        <div className="d-flex justify-content-end">
                          <Button variant="outline-success" onClick={() => setEditingTask(task)} className="me-2">
                            Edit
                          </Button>
                          <Button variant="outline-danger" onClick={() => handleTaskDelete(task.id)}>
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-muted">No tasks to display. Start by adding a new task above.</p>
            )}
          </>
        )}
      </Col>
    </Container>
  );
};

export default HomePage;