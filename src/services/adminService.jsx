import api from "./api";

export const getAlunos = async () => {
  const response = await api.get("/api/admin/getAlunos");
  return response.data;
};

export const getProfessores = async () => {
  const response = await api.get("/api/admin/getProfessor");
  return response.data;
};

export const getDisciplinas = async () => {
  const response = await api.get("/api/admin/getDisciplina");
  return response.data;
};

export const getTurmas = async () => {
  const response = await api.get("/api/admin/findTurmas");
  return response.data;
};

export const getTiposUsuario = async () => {
  const response = await api.get("/api/admin/findTipoUsuario");
  return response.data;
};

export const addUsuario = async (dados) => {
  const response = await api.post("/api/admin/addUsuario", dados);
  return response.data;
};

export const addTurma = async (dados) => {
  const response = await api.post("/api/admin/addTurma", dados);
  return response.data;
};

export const addDisciplina = async (disciplina) => {
  const response = await api.post("/api/admin/addDisciplina", null, {
    params: { disciplina }
  });

  return response.data;
};

export const updateUsuario = async (emailAtual, dados) => {
  const response = await api.post("/api/admin/updateUsuario", dados, {
    params: { emailAtual }
  });

  return response.data;
};

export const updateTurma = async (dados) => {
  const response = await api.post("/api/admin/updateTurma", dados);
  return response.data;
};

export const updateDisciplina = async (dados) => {
  const response = await api.post("/api/admin/updateDiciplina", dados);
  return response.data;
};