import api from './api';

export const login = async (email, senha) => {
    const response = await api.post("/api/usuarios/login", {
        email,
        senha
    });
    return response.data;
}