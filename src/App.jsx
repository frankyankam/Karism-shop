// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import YankiTchoukaHomePage from "./pages/HomePage";
import Register from "./pages/Register";         // <-- import
import Login from "./pages/Login";               // <-- on créera juste après
import ARViewer from "./pages/ARViewer";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import Cart from './pages/Cart';
import Products from "./pages/Products";
import ProductDetail from './pages/ProductDetail';
import Checkout from "./pages/Checkout";  // Assure-toi que le chemin est correct
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<YankiTchoukaHomePage />} />
      <Route path="/cart" element={< Cart/>} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ar-viewer/:id" element={<ARViewer />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password/:token" element={<NewPassword />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
}
