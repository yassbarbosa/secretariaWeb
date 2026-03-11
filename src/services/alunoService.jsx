import api from "./api";

export const getObservacaoAluno = async (idAluno) => {
  const response = await api.get("/api/aluno/getObservacao", {
    params: { idAluno }
  });

  return response.data;
};

export const getNotasAluno = async (idAluno) => {
  const response = await api.get("/api/aluno/getNotas", {
    params: { idAluno }
  });

  return response.data;
};