import React from "react";
import { useTheme } from "../context/ThemeContext"; // Import the theme hook
import { Button } from "react-bootstrap";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="secondary" onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
};

export default ThemeToggle;