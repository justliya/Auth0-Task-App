// TaskCard.tsx
import React from "react";
import { Card, Form } from "react-bootstrap";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onToggle: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Form.Check
          type="checkbox"
          label={<strong>{task.title}</strong>}
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <Card.Text>{task.description || "No description provided"}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
