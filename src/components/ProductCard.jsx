import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice"; // l'action qu'on a créée

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} €</p>
      <button onClick={handleAddToCart}>
        Ajouter au panier
      </button>
    </div>
  );
}

export default ProductCard;
