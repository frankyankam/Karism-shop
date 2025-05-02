// src/pages/NewPassword.jsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

export default function NewPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setStatus("error");
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    setStatus("loading");
    try {
      await axios.post(`http://localhost:5000/auth/reset-password/${token}`, {
        password,
      });
      setStatus("success");
      setMessage("Votre mot de passe a bien été réinitialisé !");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(
        err.response?.data?.error ||
          "Impossible de réinitialiser le mot de passe. Vérifiez votre lien."
      );
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4 text-center">Nouveau mot de passe</h2>

          {status === "success" && <Alert variant="success">{message}</Alert>}
          {status === "error" && <Alert variant="danger">{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPassword">
              <Form.Label>Nouveau mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez le nouveau mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </Form.Group>

            <Form.Group controlId="formConfirm" className="mt-3">
              <Form.Label>Confirmez le mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmez-le"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={6}
              />
            </Form.Group>

            <Button
              className="mt-4 w-100"
              variant="primary"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading"
                ? "Validation…"
                : "Mettre à jour le mot de passe"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
