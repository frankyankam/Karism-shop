// src/pages/ResetPassword.jsx

import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("http://localhost:5000/auth/request-reset", { email });
      setStatus("success");
      setMessage(
        "Si cet e-mail existe, vous allez recevoir un lien pour réinitialiser votre mot de passe."
      );
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(
        err.response?.data?.error ||
          "Une erreur est survenue, veuillez réessayer plus tard."
      );
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4 text-center">Mot de passe oublié</h2>

          {status === "success" && <Alert variant="success">{message}</Alert>}
          {status === "error" && <Alert variant="danger">{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Votre adresse e-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              className="mt-3 w-100"
              variant="primary"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Envoi en cours…" : "Envoyer le lien"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
