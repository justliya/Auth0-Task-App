// src/pages/Dashboard.tsx
import React, { useState } from "react";
import Task from "../hooks/Types";


const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Task 1", description: "Description 1", completed: false },
  ]);

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h1>Task Dashboard</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;