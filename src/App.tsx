
import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CallbackPage from "./pages/CallbackPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationGuard from "./AuthenticationGuard";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {/* Navbar displayed on all pages */}
      <NavBar />

      {/* Routes for the application */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasklist" element={<TaskList />} />
        <Route
          path="/profile"
          element={<AuthenticationGuard component={ProfilePage} />}
        />
        <Route path="/callback" element={<CallbackPage />} />
      </Routes>
    </>
  );
};

export default App;