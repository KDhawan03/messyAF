import axios from 'axios';

const api = axios.create({
//   baseURL: 'http://localhost:3000/api'
  baseURL: 'https://messyaf-backend.onrender.com/api'
});

export default api;
