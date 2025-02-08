import React from "react";
import { Card, Button } from "react-bootstrap";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          <strong>{task.title}</strong>
        </Card.Title>
        <Card.Text>{task.description || "No description provided"}</Card.Text>
        <Button variant="warning" onClick={() => onEdit(task)} className="me-2">
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
