import axios from "axios";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const login = (name, email) => api.post("/auth/login", { name, email });
export const getBreeds = () => api.get("/dogs/breeds");
export const searchDogs = (params) => api.get("/dogs/search", { params });
export const fetchDogs = (ids) => api.post("/dogs", ids);
export const getMatch = (ids) => api.post("/dogs/match", ids);
