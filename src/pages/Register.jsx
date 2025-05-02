// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de l’inscription');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Inscription</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {['name','phone','email','password'].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
            <input
              type={field==='password'?'password':'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}
        <button className="btn btn-primary w-100" type="submit">S’inscrire</button>
      </form>
      <p className="mt-3 text-center">
        Déjà inscrit ? <Link to="/login">Connexion</Link>
      </p>
    </div>
  );
}
