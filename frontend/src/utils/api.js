import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL || 'https://githubproxy-3olx.onrender.com'
});

export default api;