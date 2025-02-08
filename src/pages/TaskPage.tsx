import React, { useState, useEffect } from "react";
import { Container, Form, Card, Badge, Button } from "react-bootstrap";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState<string>("");

  useEffect(() => {
    const storedTasks = sessionStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleTaskToggle = (taskId: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedDescription(task.description || "");
  };

  const handleSaveDescription = (taskId: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, description: editedDescription } : task
      );
      sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    setEditingTaskId(null);
  };

  return (
    <Container className="mt-5">
      <h1>Task Checklist</h1>
      {tasks.length > 0 ? (
        <div className="d-flex flex-wrap gap-3">
          {tasks.map((task) => (
            <Card key={task.id} className="mb-3" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>
                  <Form.Check
                    type="checkbox"
                    label={task.title}
                    checked={task.completed}
                    onChange={() => handleTaskToggle(task.id)}
                  />
                </Card.Title>
                {editingTaskId === task.id ? (
                  <>
                    <Form.Control
                      as="textarea"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <Button
                      variant="success"
                      className="mt-2"
                      onClick={() => handleSaveDescription(task.id)}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Card.Text>{task.description}</Card.Text>
                    <Button variant="warning" onClick={() => handleEditClick(task)}>
                      Edit Description
                    </Button>
                  </>
                )}
                <Badge bg={task.completed ? "success" : "secondary"} className="mt-2">
                  {task.completed ? "Completed" : "Pending"}
                </Badge>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>No tasks available.</p>
      )}
    </Container>
  );
};

export default TaskPage;