import React from "react";
import { useTheme } from "../context/ThemeContext"; 
import { Button } from "react-bootstrap";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant={theme === "light" ? "dark" : "light"} 
      className="px-4 py-2 fw-bold shadow-sm rounded-pill" 
      onClick={toggleTheme}
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
};

export default ThemeToggle;