import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function Product3DModal({ show, onClose, product, onTryAR, onAddToCart }) {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product.brand} - {product.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        <model-viewer
          src={product.model_url}
          alt={product.name}
          ar
          ar-modes="scene-viewer webxr quick-look"
          environment-image="neutral"
          auto-rotate
          camera-controls
          style={{ width: "100%", height: "400px" }}
        ></model-viewer>

        <div className="mt-4 d-flex justify-content-center gap-3">
          <Button variant="success" onClick={onTryAR}>Essayer en AR</Button>
          <Button variant="primary" onClick={onAddToCart}>Ajouter au panier</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
