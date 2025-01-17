import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onSave: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<Omit<Task, "id">>({
    title: task.title,
    description: task.description || "",
    completed: task.completed,
  });

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave({ ...task, ...editedTask });
    setIsEditing(false);
  };

  return (
    <Card className="mb-3">
      {isEditing ? (
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={editedTask.description}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Check
              type="checkbox"
              label="Completed"
              checked={editedTask.completed}
              onChange={() =>
                setEditedTask((prev) => ({ ...prev, completed: !prev.completed }))
              }
            />
            <Button className="mt-2" variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              className="mt-2 ms-2"
              variant="secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </Form>
        </Card.Body>
      ) : (
        <Card.Body>
          <Card.Title>
            {task.title}{" "}
            {task.completed && (
              <span style={{ color: "green", fontSize: "0.9em" }}>
                (Completed)
              </span>
            )}
          </Card.Title>
          <Card.Text>{task.description || "No description provided"}</Card.Text>
          <Button variant="warning" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button
            variant="danger"
            className="ms-2"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </Card.Body>
      )}
    </Card>
  );
};

export default TaskCard;