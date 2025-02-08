import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: window.location.origin
      },
    });
  };

  if (!isAuthenticated) return null;

  return <Button onClick={handleLogout}>Log Out</Button>;
};

export default LogoutButton;