import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const RegisterButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleRegister = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button variant="outline-success" className="px-4 py-2 fw-bold shadow-sm rounded-pill" onClick={handleRegister}>
      Sign Up
    </Button>
  );
};

export default RegisterButton;
