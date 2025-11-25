import axios from 'axios';

// Configura o Axios para bater na porta 8000 (Padrão do FastAPI)
const api = axios.create({
  baseURL: 'http://localhost:8000', 
});

export default api;