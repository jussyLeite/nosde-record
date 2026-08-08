import axios from "axios";


// Endereço do teu backend Spring Boot (ajusta a porta se necessário)
const API_BASE_URL = "http://localhost:5000/api";



export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercetor de resposta para tratar erros globais de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Se o token for inválido ou expirar, limpa o armazenamento e desloga
      localStorage.removeItem("@NosdeRecord:token");
      localStorage.removeItem("@NosdeRecord:user");
      window.location.href = "/login"; // Redireciona de forma forçada
    }
    return Promise.reject(error);
  }
);

/*  Nota Importante: Lembra-te de envolver toda a tua aplicação com o <AuthProvider> dentro do teu ficheiro principal src/main.tsx ou src/App.tsx. */