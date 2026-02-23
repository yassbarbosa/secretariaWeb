import { useState } from "react";
import Tabela from "../../components/Tabela/Tabela";
import style from "./AreaProfessor.module.css";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import Observacoes from "../../components/Observacoes/Observacoes";
import GradeModal from "../../components/ModalCadastroNotas/ModalCadastroNotas";
import Navbar from "../../components/Navbar/Navbar";

export default function AreaProfessor() {
  const [modalAberto, setModalAberto] = useState(false);

  const colunasProfessor = [
    { label: "Aluno", key: "aluno" },
    { label: "Série", key: "serie" },
    { label: "Turma", key: "turma" },
    { label: "N1", key: "n1" },
    { label: "N2", key: "n2" },
    { label: "Média", key: "media" }
  ];

  const dadosProfessor = [
    { aluno: "João", serie: "1°", turma: "G", n1: 8, n2: 7, media: 7.5 },
    { aluno: "Maria", serie: "2°", turma: "H", n1: 9, n2: 10, media: 9.5 },
    { aluno: "Carlos", serie: "3°", turma: "F", n1: 5, n2: 6, media: 5.5 }
  ];

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
            <Tabela colunas={colunasProfessor} dados={dadosProfessor} />
          </div>

        </div>
      <Observacoes role="professor" />
    </div>

    {modalAberto && (
      <div className={style.overlay} onClick={fecharModal}>
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
