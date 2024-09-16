import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../forms/LoginForm";
import "../styles/login.scss";
import logo from "../assets/images/logo.webp";
import alluviumLogo from "../assets/images/alluvium-logo.webp";

function LoginPage() {
  const [forgotPassword, setForgotPassword] = useState(false);
  return (
    <Container fluid className="login-container" style={{ height: "100vh" }}>
      <Row className="login-row">
        <Col className="login-left-col"></Col>
        <Col className="login-right-col">
          <div className="login-right-col-inner-container">
            <img src={logo} alt="logo" width="100%" />
            <LoginForm
              forgotPassword={forgotPassword}
              setForgotPassword={setForgotPassword}
            />
          </div>

          <div className="login-footer">
            <p> Version: {process.env.REACT_APP_VERSION}</p>
            <img src={alluviumLogo} width={80} alt="" />
            <p>
              Powered By:&nbsp;
              <a
                href="https://www.alluvium.in/"
                target="_blank"
                rel="noreferrer"
              >
                <span>AIVision | EXIM&nbsp;</span>
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
