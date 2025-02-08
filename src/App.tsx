import React from "react"
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import TaskPage from "./pages/TaskPage";
import { useAuth0 } from "@auth0/auth0-react";
import { ThemeProvider } from "./context/ThemeContext";

const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <ThemeProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/task" element={<TaskPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
