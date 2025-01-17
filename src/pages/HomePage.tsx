import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { useAuth0 } from "@auth0/auth0-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from sessionStorage when the component mounts
  useEffect(() => {
    const storedTasks = sessionStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // Parse and set tasks from sessionStorage
    }
  }, []);

  // Save tasks to sessionStorage whenever tasks change
  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskSubmit = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]); // Add the new task to the state
  };

  const handleTaskSave = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <Container className="mt-5">
      <Col>
        <h1>Welcome to the Task Manager</h1>
        <p>
          {isAuthenticated
            ? "You are logged in. Manage your tasks below."
            : "Please log in to manage your tasks."}
        </p>

        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && (
          <>
            <LogoutButton />
            <TaskForm onSubmit={handleTaskSubmit} />
            <h2 className="mt-4">Your Tasks</h2>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onSave={handleTaskSave}
                  onDelete={handleTaskDelete}
                />
              ))
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