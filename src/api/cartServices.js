import axios from 'axios';

// Récupérer les articles du panier pour un client
export const getCartItems = async (clientId) => {
  const response = await axios.get(`/api/cart/${clientId}`);
  return response.data;
};

// Mettre à jour la quantité d'un article dans le panier
export const updateCartItemQuantity = async (clientId, itemId, quantity) => {
  const response = await axios.put(`/api/cart/${clientId}/update`, {
    item_id: itemId,
    quantity,
  });
  return response.data;
};

// Vider le panier du client
export const clearCart = async (clientId) => {
  const response = await axios.delete(`/api/cart/${clientId}/clear`);
  return response.data;
};

// Valider le panier (checkout)
export const checkoutCart = async (clientId) => {
  const response = await axios.post(`/api/cart/${clientId}/checkout`);
  return response.data;
};

// Ajouter un produit au panier
export const addToCart = async (clientId, productId, quantity) => {
  const response = await axios.post(`/api/cart/${clientId}/add`, {
    product_id: productId,
    quantity,
  });
  return response.data;
};
