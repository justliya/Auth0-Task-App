import { useAuth0 } from "@auth0/auth0-react";
import {  Container, Card } from "react-bootstrap";
import LogoutButton from "../components/LogoutButton";

const ProfilePage: React.FC = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    if (!isAuthenticated) {
        return <div className="text-center text-muted">You are not authenticated.</div>;
    }

    if (!user) {
        return <div className="text-center text-muted">No user profile found.</div>;
    }

    getAccessTokenSilently().then(token => console.log('token', token));

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card className="shadow-lg p-4 border-success text-center" style={{ width: "24rem" }}>
                {user?.picture && <Card.Img variant="top" src={user.picture} className="rounded-circle mx-auto" style={{ width: "100px" }} />}
                <Card.Body>
                    <Card.Title className="fw-bold text-success">{user.name}</Card.Title>
                    <Card.Text className="text-muted">{user.email}</Card.Text>
                    <div className="text-start">
                        {Object.keys(user).map((objKey, index) => (
                            <p key={index}><b className="text-success">{objKey}:</b> {user[objKey]}</p>
                        ))}
                    </div>
                    <LogoutButton  />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;