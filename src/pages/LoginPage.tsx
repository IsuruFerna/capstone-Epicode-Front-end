import React from "react";
import "./LoginPage.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import LoginForm from "../component/login-register/LoginForm";

const LoginPage = () => {
   return (
      <Container>
         <Row className="vh-100 d-flex align-content-center">
            <Col md={6} lg={7} className="text-secondary">
               <h1 className="fw-bold mb-0 main-title lh-1">NETWORK</h1>
               <div>
                  <p className="ps-2">
                     The social network
                     <br />
                     that empowers you with knowledge,
                     <br />
                     values quality over quantity,
                     <br />
                     and helps you discover new perspectives
                  </p>
               </div>
            </Col>
            <Col md={6} lg={5} className="pt-2">
               <LoginForm />
               <Button
                  className="w-100 mt-3"
                  variant="outline-secondary"
                  type="submit"
               >
                  Sign up
               </Button>
            </Col>
         </Row>
      </Container>
   );
};

export default LoginPage;
