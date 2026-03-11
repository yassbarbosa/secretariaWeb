import { useState, useEffect } from "react";
import Tabela from "../../components/Tabela/Tabela";
import style from "./AreaProfessor.module.css";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import Observacoes from "../../components/Observacoes/Observacoes";
import GradeModal from "../../components/ModalCadastroNotas/ModalCadastroNotas";
import Navbar from "../../components/Navbar/Navbar";

import { getObservacao, getAlunosByProfessor } from "../../services/professorService";

export default function AreaProfessor() {

  const [modalAberto, setModalAberto] = useState(false);
  const [dadosProfessor, setDadosProfessor] = useState([]);
  const [observacoes, setObservacoes] = useState([]);

  const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

  const colunasProfessor = [
    { label: "Aluno", key: "aluno" },
    { label: "Matrícula", key: "matricula" },
    { label: "Turma", key: "turma" },
    { label: "N1", key: "n1" },
    { label: "N2", key: "n2" },
    { label: "Média", key: "media" }
  ];

  useEffect(() => {
    buscarAlunos();
    buscarObservacoes();
  }, []);

  const buscarAlunos = async () => {

    try {

      const data = await getAlunosByProfessor(usuarioLogado.id);

      const formatado = data.map((aluno) => ({
        aluno: aluno.nomeCompleto,
        matricula: aluno.matricula,
        turma: aluno.idTurma,
        n1: aluno.n1,
        n2: aluno.n2,
        media: aluno.media
      }));

      setDadosProfessor(formatado);

    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }

  };

  const buscarObservacoes = async () => {

    try {

      const data = await getObservacao(usuarioLogado.id);

      setObservacoes(data);

    } catch (error) {
      console.error("Erro ao buscar observações:", error);
    }

  };

  function abrirModal() {
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  return (
    <div className={style.principal}>

      <Navbar role="professor" />

      <h2>Perfil</h2>
      <h5>Professor</h5>

      <div className={style.container}>

        <div className={style.backgroundTabela}>

          <div className={style.topoTabela}>

            <BarraPesquisa placeholder="Pesquisar..." />

            <Button
              className={style.botaoAdicionar}
              onClick={abrirModal}
            >
              Adicionar Nota
            </Button>

          </div>

          <div className={style.titulo}>

            <h1>Notas</h1>

            <Tabela
              colunas={colunasProfessor}
              dados={dadosProfessor}
            />

          </div>

        </div>

        <Observacoes
          role="professor"
          dados={observacoes}
        />

      </div>

      {modalAberto && (
        <div
          className={style.overlay}
          onClick={fecharModal}
        >
          <div
            className={style.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <GradeModal onSubmit={fecharModal} />
          </div>
        </div>
      )}

    </div>
  );
}