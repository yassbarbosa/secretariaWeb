import { useEffect, useState } from "react";
import Tabela from "../../components/Tabela/Tabela";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import style from "./AreaAdm.module.css";

import { getTurmas } from "../../services/adminService";

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

    try {

      const data = await getTurmas();

      const formatado = data.map((turma, index) => ({
        id: index + 1,
        turma: turma.turma,
        ano: turma.anoEscolar,
        acoes: "Editar"
      }));

      setDados(formatado);

    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    }

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