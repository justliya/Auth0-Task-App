// ProfilePage.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { Col } from "react-bootstrap";
import LogoutButton from "../components/LogoutButton";

const ProfilePage: React.FC = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    if (!isAuthenticated) {
        return <div>Not authenticated</div>;
    }

    if (!user) {
        return <div>No user profile</div>;
    }


    getAccessTokenSilently().then(token => console.log('token', token));

    return (
        <div>
            <h2>Profile Page</h2>
            <Col>
                {user?.picture && <img src={user.picture} alt={user.name} />}
                <h3>{user.name}</h3>
                <div>
                    {Object.keys(user).map((objKey, index) => (
                        <p key={index}><b>{objKey}</b>: {user[objKey]}</p>
                    ))}
                </div>
                <LogoutButton />
            </Col>
        </div>
    );
};

export default ProfilePage;
