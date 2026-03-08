import { useEffect, useState } from "react";
import Tabela from "../../components/Tabela/Tabela";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import style from "./AreaAdm.module.css";

export default function AreaTurma() {

  const [dados, setDados] = useState([]);

  const colunas = [
    { label: "ID", key: "id" },
    { label: "Turma", key: "turma" },
    { label: "Ano", key: "ano" },
    { label: "Ações", key: "acoes" },
  ];

  useEffect(() => {
    buscarTurmas();
  }, []);

  async function buscarTurmas() {

    const response = await fetch(
      "https://aprendeaiapi-pw5p.onrender.com/api/admin/findTurma"
    );

    const data = await response.json();

    const formatado = data.map((turma, index) => ({
      id: index + 1,
      turma: turma.disciplina.nomeDisciplina,
      ano: turma.anoEscolar,
      acoes: "Editar"
    }));

    setDados(formatado);
  }

  return (
    <div className={style.backgroundTabela}>

      <div className={style.topoTabela}>
        <BarraPesquisa placeholder="Pesquisar turma..." />
        <Button>Adicionar Turma</Button>
      </div>

      <h1>Turmas</h1>

      <Tabela colunas={colunas} dados={dados} />

    </div>
  );
}