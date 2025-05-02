// src/api/auth.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/auth',  // adapte si besoin
});

export const registerUser = (data) => API.post('/register', data);
export const loginUser    = (data) => API.post('/login', data);
