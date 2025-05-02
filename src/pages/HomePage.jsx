import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Button } from "react-bootstrap";
import Slider from "react-slick";
import Navbar from "../components/Navbar";
import MerchMenu from "./MerchMenu";
import ProductModal from "../components/ProductModal";
import { fetchProducts } from "../api/products";
import { addToCart } from "../api/cartServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function YankiTchoukaHomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const clientId = localStorage.getItem("client_id");

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        console.log("Produits récupérés:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Erreur chargement produits :", err));
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const handleProductClick = (p) => {
    setSelectedProduct(p);
    setShowModal(true);
  };

  const handleTryAR = () => {
    setShowModal(false);
    window.location.href = `/ar-viewer/${selectedProduct.id}`;
  };

  const handleAdd = async () => {
    if (!clientId) {
      alert("Veuillez vous connecter pour ajouter au panier.");
      setShowModal(false);
      return;
    }
    try {
      await addToCart(clientId, selectedProduct.id, 1);
      alert(`${selectedProduct.name} ajouté au panier !`);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout au panier");
    }
    setShowModal(false);
  };

  const imageStyle = { width: "100%", height: "350px", objectFit: "cover" };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <section className="px-4 py-5 bg-light">
        <h2 className="text-center fw-bold mb-4">Nos produits phares</h2>
        <Carousel interval={3000} style={{ maxHeight: 500 }}>
          {products.map((p) => (
            <Carousel.Item key={p.id}>
              <img
                className="d-block w-100"
                src={p.image_url}
                alt={p.name}
                style={{ objectFit: "cover", height: "500px" }}
              />
              <Carousel.Caption>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                {/* Utilisation de Link pour la redirection */}
                <Link to={`/products`}>
                  <Button variant="primary">Acheter maintenant</Button>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      <div className="container1">
        <section className="px-4 py-5 bg-light">
          <h2 className="text-center fw-bold mb-4">Collections populaires</h2>
          <Slider {...sliderSettings}>
            {products.length === 0 ? (
              <div>Aucun produit disponible.</div>
            ) : (
              products.map((p) => (
                <div key={p.id} className="px-2 fade-in">
                  <div className="card h-100 shadow-sm position-relative">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="card-img-top"
                      style={imageStyle}
                      loading="lazy"
                    />
                    <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
                      <button
                        className="btn btn-light rounded-pill px-3 fw-bold shadow-sm"
                        onClick={() => handleProductClick(p)}
                      >
                        {p.name}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Slider>
        </section>

        <section className="text-center py-5">
          <Link to="/cart">
            <Button variant="success" className="btn-lg">
              Voir le panier
            </Button>
          </Link>
        </section>

        <MerchMenu />
      </div>

      <ProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        product={selectedProduct}
        onTryAR={handleTryAR}
        onAddToCart={handleAdd}
      />
    </>
  );
}
