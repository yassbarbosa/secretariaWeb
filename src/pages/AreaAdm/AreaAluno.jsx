import { useEffect, useState } from "react";
import Tabela from "../../components/Tabela/Tabela";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import style from "./AreaAdm.module.css";

import { getAlunos } from "../../services/adminService";
import AddUserModal from "../../components/AddUserModal/AddUserModal";

export default function AreaAluno() {
  const [dadosAluno, setDadosAluno] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const colunasAluno = [
    { label: "Matrícula", key: "matricula" },
    { label: "Nome", key: "nome" },
    { label: "CPF", key: "cpf" },
    { label: "E-mail", key: "email" },
    { label: "Série", key: "serie" },
    { label: "Ações", key: "acoes" },
  ];

  useEffect(() => {
    buscarAlunos();
  }, []);

  useEffect(() => {
    if (!termoPesquisa.trim()) {
      setDadosFiltrados(dadosAluno);
      return;
    }

    const termo = termoPesquisa.toLowerCase().trim();
    const filtrados = dadosAluno.filter(aluno => {
      return (
        aluno.nome?.toLowerCase().includes(termo) ||
        aluno.matricula?.toLowerCase().includes(termo) ||
        aluno.cpf?.includes(termo) ||
        aluno.email?.toLowerCase().includes(termo) ||
        aluno.serie?.toLowerCase().includes(termo)
      );
    });
    
    setDadosFiltrados(filtrados);
  }, [termoPesquisa, dadosAluno]);

  async function buscarAlunos() {
    try {
      const data = await getAlunos();
      const formatado = data.map((aluno) => ({
        matricula: aluno.matricula,
        nome: aluno.nomeCompleto,
        cpf: aluno.cpf,
        email: aluno.email,
        serie: aluno.anoEscolar,
        acoes: "Editar"
      }));
      setDadosAluno(formatado);
      setDadosFiltrados(formatado);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  }

  function handleSearch(valor) {
    setTermoPesquisa(valor);
  }

  function abrirModal() {
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  return (
    <div className={style.backgroundTabela}>
      <div className={style.topoTabela}>
        <BarraPesquisa 
          placeholder="Pesquisar por nome, matrícula, CPF ou email..."
          onSearch={handleSearch}
        />
        <Button onClick={abrirModal}>Adicionar Aluno</Button>
      </div>

      <h1>Alunos</h1>
      <Tabela colunas={colunasAluno} dados={dadosFiltrados} />

      {modalAberto && (
        <AddUserModal
          onClose={fecharModal}
          onSuccess={buscarAlunos}
        />
      )}
    </div>
  );
}