import axios from "axios";

const api = axios.create({
    baseURL: "https://aprendeaiapi-pw5p.onrender.com"
});

export default api;