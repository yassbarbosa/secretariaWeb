import api from "./api";

export const addUsuario = async (dados) => {
  const response = await api.post("/api/admin/addUsuario", dados);
  return response.data;
};

export const addTurma = async (dados) => {
  const response = await api.post("/api/admin/addTurma", dados);
  return response.data;
};

export const addDisciplina = async (dados) => {
  const response = await api.post("/api/admin/addDisciplina", dados);
  return response.data;
};

export const findTurma = async () => {
  const response = await api.get("/api/admin/findTurma");
  return response.data;
};

export const findTurmaPalavra = async (palavra) => {
  const response = await api.get("/api/admin/findTurmaPalavra", {
    params: { palavra }
  });

  return response.data;
};

export const findTipoUsuario = async () => {
  const response = await api.get("/api/admin/findTipoUsuario");
  return response.data;
};