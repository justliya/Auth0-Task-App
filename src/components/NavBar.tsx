import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Navbar bg="success" variant="dark" expand="lg" className="shadow-sm p-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
          Task Manager
        </Navbar.Brand>
        <ThemeToggle />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-white fw-bold">
              Home
            </Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/profile" className="text-white fw-bold">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/task" className="text-white fw-bold">
                  Tasks
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
