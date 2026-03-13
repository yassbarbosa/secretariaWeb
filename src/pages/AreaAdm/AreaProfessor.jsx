import { useEffect, useState } from "react";
import Tabela from "../../components/Tabela/Tabela";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import style from "./AreaAdm.module.css";
import AddProfModal from "../../components/AddProfModal/AddProfModal";

import { getProfessores } from "../../services/adminService";

export default function AreaProfessor() {
  const [professorSelecionado, setProfessorSelecionado] = useState(null);
  const [dados, setDados] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const colunas = [
    { label: "Registro", key: "registro" },
    { label: "Nome", key: "nome" },
    { label: "Disciplina", key: "disciplina" },
    { label: "E-mail", key: "email" },
    { label: "Ano escolar", key: "ano_escolar" },
    { label: "Ações", key: "acoes" },
  ];

  useEffect(() => {
    buscarProfessores();
  }, []);

  useEffect(() => {
    if (!termoPesquisa.trim()) {
      setDadosFiltrados(dados);
      return;
    }

    const termo = termoPesquisa.toLowerCase().trim();
    const filtrados = dados.filter(prof => {
      return (
        prof.nome?.toLowerCase().includes(termo) ||
        prof.registro?.toLowerCase().includes(termo) ||
        prof.disciplina?.toLowerCase().includes(termo) ||
        prof.email?.toLowerCase().includes(termo) ||
        prof.ano_escolar?.toLowerCase().includes(termo)
      );
    });
    
    setDadosFiltrados(filtrados);
  }, [termoPesquisa, dados]);

  async function buscarProfessores() {
    try {
      const data = await getProfessores();
      const formatado = data.map((prof) => ({
        id: prof.professorId,
        registro: prof.matricula,
        nome: prof.nomeCompleto,
        disciplina: prof.nomeDisciplina,
        email: prof.email,
        ano_escolar: prof.anoEscolar,
        acoes: (
          <Button
            onClick={() =>
              abrirModal({
                id: prof.professorId,
                matricula: prof.matricula,
                nomeCompleto: prof.nomeCompleto,
                email: prof.email,
                disciplina: prof.nomeDisciplina,
                anoEscolar: prof.anoEscolar
              })
            }
          >
            Editar
          </Button>
        )
      }));
      setDados(formatado);
      setDadosFiltrados(formatado);
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
    }
  }

  function handleSearch(valor) {
    setTermoPesquisa(valor);
  }

  function abrirModal(professor = null) {
    setProfessorSelecionado(professor);
    setModalAberto(true);
  }

  function fecharModal() {
    setProfessorSelecionado(null);
    setModalAberto(false);
  }

  return (
    <div className={style.backgroundTabela}>

      <div className={style.topoTabela}>
        <BarraPesquisa 
          placeholder="Pesquisar professor por nome, registro, disciplina ou email..."
          onSearch={handleSearch}
        />
        <Button onClick={() => abrirModal()}>
          Adicionar Professor
        </Button>
      </div>

      <h1>Professores</h1>

      <Tabela colunas={colunas} dados={dadosFiltrados} />

      {modalAberto && (
        <AddProfModal 
          professor={professorSelecionado}
          onClose={fecharModal}
          onSuccess={buscarProfessores}
        />
      )}
    </div>
  );
}