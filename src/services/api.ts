import axios from "axios";

// Endereço do teu backend Spring Boot (ajusta a porta se necessário)
const API_BASE_URL = "http://localhost:5000/api";

const TOKEN_KEY = "@NosdeRecord:token";
const USER_KEY = "@NosdeRecord:user";


export const api = axios.create({
  baseURL: API_BASE_URL,
});




api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem(
      TOKEN_KEY
    );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }


    /*
     * Se NÃO for FormData,
     * enviamos JSON.
     *
     * Se for FormData, NÃO definimos
     * Content-Type manualmente.
     *
     * O browser/Axios vai criar:
     *
     * multipart/form-data;
     * boundary=----------------...
     */

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] =
        "application/json";
    }


    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);



api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (
      error.response?.status === 401
    ) {

      localStorage.removeItem(
        TOKEN_KEY
      );

      localStorage.removeItem(
        USER_KEY
      );

      window.location.href =
        "/login";
    }

    return Promise.reject(error);
  }
);

/*export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
}); */

/**
 * Interceptor de REQUEST
 *
 * Pega automaticamente o token armazenado no localStorage
 * e envia no header:
 *
 * Authorization: Bearer <token>
 */

/*
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);  */  

/**
 * Interceptor de RESPONSE
 *
 * Se o backend responder 401 (Unauthorized),
 * remove os dados de autenticação e redireciona
 * o utilizador para o login.
 */

/*
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);  */


