import api from "./api";

export const addNota = async (dados) => {
  const response = await api.post("/api/professor/addNota", dados);
  return response.data;
};

export const updateNota = async (dados) => {
  const response = await api.post("/api/professor/updateNota", dados);
  return response.data;
};

export const addObservacao = async (dados) => {
  const response = await api.post("/api/professor/addObservacao", dados);
  return response.data;
};

export const getObservacao = async (professorId) => {
  const response = await api.get("/api/professor/getObservacao", {
    params: { professorId }
  });

  return response.data;
};

export const getAlunosByProfessor = async (idProfessor) => {
  const response = await api.get("/api/professor/getAlunosByProfessor", {
    params: { idProfessor }
  });

  return response.data;
};

export const getAlunoByTurma = async (idTurma) => {
  const response = await api.get("/api/professor/getAlunoByTurma", {
    params: { idTurma }
  });

  return response.data;
};