import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { addToCart } from '../api/cartServices';
import { fetchProducts } from '../api/products'; // Assurez-vous que vous avez cette fonction d'API
import Navbar from '../components/Navbar';
import ProductModal from '../components/ProductModal';

const ProductDetail = () => {
  const { id } = useParams();  // Récupère l'id du produit depuis l'URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [clientId, setClientId] = useState(localStorage.getItem("client_id"));

  useEffect(() => {
    // Appel à l'API pour récupérer les détails du produit
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération du produit:", err);
      });
  }, [id]);

  const handleAddToCart = async () => {
    if (!clientId) {
      alert("Veuillez vous connecter pour ajouter au panier.");
      return;
    }
    try {
      await addToCart(clientId, product.id, 1);
      alert(`${product.name} ajouté au panier !`);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout au panier");
    }
  };

  const handleTryAR = () => {
    setShowModal(false);
    navigate(`/ar-viewer/${product.id}`);
  };

  if (!product) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Navbar isDarkMode={false} toggleDarkMode={() => {}} />

      <div className="container py-5">
        <h2 className="text-center mb-4">{product.name}</h2>
        <div className="row">
          <div className="col-md-6">
            <img src={product.image_url} alt={product.name} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h4>Description :</h4>
            <p>{product.description}</p>

            <Button variant="primary" onClick={handleAddToCart}>
              Ajouter au panier
            </Button>

            <Button variant="secondary" onClick={() => setShowModal(true)} className="ms-3">
              Essayer en réalité augmentée
            </Button>
          </div>
        </div>

        {/* Affichage du Modal pour la réalité augmentée */}
        <ProductModal
          show={showModal}
          onHide={() => setShowModal(false)}
          product={product}
          onTryAR={handleTryAR}
          onAddToCart={handleAddToCart}
        />
      </div>
    </>
  );
};

export default ProductDetail;
