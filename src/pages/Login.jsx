// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const [form, setForm] = useState({ phone_or_email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await loginUser(form);
      // stocke token et client_id
      localStorage.setItem('token', data.token);
      localStorage.setItem('client_id', data.client_id);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Identifiants invalides');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Connexion</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Téléphone ou Email</label>
          <input
            type="text"
            name="phone_or_email"
            value={form.phone_or_email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">Se connecter</button>
      </form>
      <p className="mt-3 text-center">
        Pas encore inscrit ? <Link to="/register">Inscription</Link>
      </p>
      <p>
      <Link to="/reset-password">Mot de passe oublié ?</Link>
      </p>
    </div>
  );
}
