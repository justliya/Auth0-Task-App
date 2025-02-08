// HomePage.tsx (Dashboard)
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import TaskCard from "../components/TaskCard";
import LoginButton from "../components/LoginButton";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = sessionStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks || "[]"));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskToggle = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Container className="mt-5">
      <Col>
        <h1>Task Manager Dashboard</h1>
        {!isAuthenticated ? (
          <LoginButton />
        ) : (
          <>
            <h3>Welcome, {user?.name}!</h3>
            <h2 className="mt-4">Your Tasks</h2>
            {tasks.length > 0 ? (
              <Row>
                {tasks.map((task) => (
                  <Col md={4} key={task.id}>
                    <TaskCard task={task} onToggle={handleTaskToggle} />
                  </Col>
                ))}
              </Row>
            ) : (
              <p>No tasks to display.</p>
            )}
          </>
        )}
      </Col>
    </Container>
  );
};

export default HomePage;