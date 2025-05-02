import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="container mt-5">
      <h2>Merci pour votre commande ! 🎉</h2>
      <p>Votre commande a été reçue avec succès. Nous vous contacterons pour la livraison.</p>
      <Link to="/" className="btn btn-primary">Retour à la page d'accueil</Link>
    </div>
  );
};

export default OrderConfirmation;
