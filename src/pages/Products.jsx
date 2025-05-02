import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleOpenModal = async (id) => {
    console.log("Ouverture du produit ID:", id);
    try {
      const res = await axios.get(`${API_BASE_URL}/products/${id}`);
      console.log("Produit chargé :", res.data);
      setSelectedProduct(res.data);
      setShowModal(true);
    } catch (error) {
      console.error("Erreur lors du chargement du produit :", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mt-4">
      <h2>Nos Produits</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              <img src={product.image_url} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <button className="btn btn-primary" onClick={() => {
  console.log("Clic détecté sur le bouton produit ID:", product.id);
  handleOpenModal(product.id);
}}>
  Voir produit
</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODALE AVEC 3D */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Description :</strong> {selectedProduct?.description}</p>
          <p><strong>Prix :</strong> {selectedProduct?.price}€</p>
          <div className="text-center mb-3">
            <img
              src={selectedProduct?.image_url}
              alt={selectedProduct?.name}
              style={{ maxWidth: "300px" }}
              className="img-fluid"
            />
          </div>

          {/* 👟 MODÈLE 3D 👟 */}
          {selectedProduct?.model_url && (
            <div style={{ width: "100%", height: "400px" }}>
              <a-scene embedded background="color: #ECECEC">
                <a-assets>
                  <a-asset-item
                    id="model"
                    src={selectedProduct.model_url}
                    response-type="arraybuffer"
                  ></a-asset-item>
                </a-assets>
                <a-entity gltf-model="#model" position="0 0 -2" rotation="0 45 0" scale="1 1 1" animation="property: rotation; to: 0 405 0; loop: true; dur: 8000"></a-entity>
                <a-camera position="0 1.6 0"></a-camera>
              </a-scene>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button variant="success">Ajouter au panier</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
