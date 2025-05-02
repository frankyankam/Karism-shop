// frontend/src/pages/Cart.jsx

import React, { useEffect, useState } from 'react';
import { getCartItems, clearCart, updateCartItemQuantity, checkoutCart } from '../api/cartServices'; // Tes services API bien appelés
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const clientId = localStorage.getItem('client_id');

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!clientId) return;  // Ajoute cette ligne de sécurité
      try {
        const data = await getCartItems(clientId);
  
        if (Array.isArray(data)) {
          setCartItems(data);
        } else if (data.items && Array.isArray(data.items)) { // et pas data.cart
          setCartItems(data.items);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du panier :", error);
        setCartItems([]);
      }
    };
  
    fetchCartItems();
  }, [clientId]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await updateCartItemQuantity(clientId, itemId, newQuantity);
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité :', error);
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await clearCart(clientId); // utilise bien clearCart de ton service
      console.log(response.data.message);
      setCartItems([]); // Vide l'affichage
      alert('Votre panier a été vidé 🛒');
    } catch (error) {
      console.error("Erreur lors de la suppression du panier :", error);
    }
  };

  const handleCheckout = async () => {
    if (window.confirm("Valider la commande ?")) {
      try {
        await checkoutCart(clientId);
setCartItems([]);
alert('Commande validée avec succès 🎉');
navigate("/checkout");
      } catch (error) {
        console.error('Erreur lors du checkout :', error);
      }
    }
  };

  if (!clientId) {
    return <p className="text-center mt-5">Veuillez vous connecter pour voir votre panier.</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Votre Panier</h2>

      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-danger" onClick={handleClearCart}>
              Vider le Panier
            </button>
            <button className="btn btn-success" onClick={handleCheckout}>
              Valider la Commande
            </button>
          </div>

          <div className="row">
            {cartItems.map((item, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100">
                  <img 
                    src={item.image_url} 
                    className="card-img-top" 
                    alt={item.name} 
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Prix : {item.price} €</p>
                    <div className="d-flex align-items-center">
                      <label className="me-2">Quantité :</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="form-control"
                        style={{ width: '80px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
