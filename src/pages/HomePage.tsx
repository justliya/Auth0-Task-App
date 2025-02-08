import React, { useState, useEffect } from "react";
import { Col, Container, ListGroup, Badge, Button } from "react-bootstrap";
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

  useEffect(() => {
    const storedTasks = sessionStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskSubmit = (task: Task) => {
    if (editingTask) {
      handleTaskEdit(task);
    } else {
      setTasks((prevTasks) => [...prevTasks, task]);
    }
    setEditingTask(null);
  };

  const handleTaskEdit = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <Container className="mt-5">
      <Col>
        <h1>Task Manager Dashboard</h1>
        {!isAuthenticated ? (
          <>
            <LoginButton />
            <RegisterButton />
          </>
        ) : (
          <>
            <h3>Welcome, {user?.name}!</h3>
            <TaskForm onSubmit={handleTaskSubmit} initialTask={editingTask || undefined} />
            <h2 className="mt-4">Your Tasks</h2>
            {tasks.length > 0 ? (
              <ListGroup>
                {tasks.map((task) => (
                  <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{task.title}</strong>
                      <p>{task.description}</p>
                      <Badge bg={task.completed ? "success" : "secondary"}>
                        {task.completed ? "Completed" : "Pending"}
                      </Badge>
                    </div>
                    <div>
                      <Button variant="warning" onClick={() => setEditingTask(task)} className="me-2">Edit</Button>
                      <Button variant="danger" onClick={() => handleTaskDelete(task.id)}>Delete</Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p>No tasks to display. Add a task above!</p>
            )}
          </>
        )}
      </Col>
    </Container>
  );
};

export default HomePage;
