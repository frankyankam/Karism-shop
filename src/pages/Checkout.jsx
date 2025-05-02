import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartItems } from '../api/cartServices'; // Assure-toi d'avoir la méthode qui récupère les éléments du panier
import { Button, Form } from 'react-bootstrap';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [clientInfo, setClientInfo] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'card', // par défaut, carte bancaire
  });
  const navigate = useNavigate();
  const clientId = localStorage.getItem('client_id');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await getCartItems(clientId);
        if (Array.isArray(data.items)) {
          setCartItems(data.items);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du panier :', error);
      }
    };

    if (clientId) {
      fetchCartItems();
    }
  }, [clientId]);

  const handleChange = (e) => {
    setClientInfo({ ...clientInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    // Validation de la commande et redirection ou appel API
    alert("Commande validée avec succès ! 🎉");
    navigate("/confirmation"); // ou "/order-success"
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h2>Récapitulatif de votre commande</h2>

      <div className="mb-4">
        <h4>Détails de la commande</h4>
        {cartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} = {item.price * item.quantity} €
              </li>
            ))}
          </ul>
        )}
        <hr />
        <p><strong>Total: {totalAmount} €</strong></p>
      </div>

      <div>
        <h4>Informations de facturation</h4>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Nom complet</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={clientInfo.name}
              onChange={handleChange}
              placeholder="Entrez votre nom"
            />
          </Form.Group>

          <Form.Group controlId="formPhone" className="mt-3">
            <Form.Label>Numéro de téléphone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={clientInfo.phone}
              onChange={handleChange}
              placeholder="Entrez votre numéro"
            />
          </Form.Group>

          <Form.Group controlId="formAddress" className="mt-3">
            <Form.Label>Adresse de livraison</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={clientInfo.address}
              onChange={handleChange}
              placeholder="Entrez votre adresse"
            />
          </Form.Group>

          <Form.Group controlId="formPaymentMethod" className="mt-3">
            <Form.Label>Méthode de paiement</Form.Label>
            <Form.Control
              as="select"
              name="paymentMethod"
              value={clientInfo.paymentMethod}
              onChange={handleChange}
            >
              <option value="card">Carte bancaire</option>
              <option value="paypal">PayPal</option>
              <option value="cash">Paiement à la livraison</option>
            </Form.Control>
          </Form.Group>

          <div className="text-center mt-4">
            <Button variant="success" size="lg" onClick={handlePayment}>
              Valider la commande
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
