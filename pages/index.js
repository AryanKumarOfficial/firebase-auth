import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import PhoneSignUp from "../components/PhoneSignUp";
import ProtectedRoute from "../components/ProtectedRoute";
import { UserAuthContextProvider } from "../context/UserAuthContext";

export default function App() {
  const router = useRouter();

  return (
    <Container className="shadow-lg" style={{ maxWidth: "400px" }}>
      <Row>
        <Col>
          <UserAuthContextProvider>
            {router.pathname === "/home" ? (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ) : router.pathname === "/signup" ? (
              <Signup />
            ) : router.pathname === "/phonesignup" ? (
              <PhoneSignUp />
            ) : (
              <Login />
            )}
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}
