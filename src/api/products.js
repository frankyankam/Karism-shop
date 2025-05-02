// src/services/product.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// api/products.js
export const fetchProducts = async () => {
  try {
    const response = await fetch('/api/products'); // Assure-toi que le chemin API est correct
    if (!response.ok) throw new Error('Erreur de chargement des produits');
    const data = await response.json();
    console.log('Produits récupérés :', data); // Vérification des données
    return data;
  } catch (error) {
    console.error('Erreur lors du fetch des produits:', error);
    return [];
  }
};

