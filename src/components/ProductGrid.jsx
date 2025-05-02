// src/components/ProductGrid.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Erreur lors du chargement des produits :", err));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Nos Produits</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map(product => (
          <div className="col" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
