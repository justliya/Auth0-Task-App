import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Button, Form } from "react-bootstrap";

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
    <Container className="mt-5">
      <h1>Register</h1>
      <p>Create an account to start managing your tasks.</p>
      <Form>
        <Button variant="primary" onClick={handleRegister}>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterButton;
