import { useEffect, useState } from "react";
import Tabela from "../../components/Tabela/Tabela";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import style from "./AreaAdm.module.css";

import { getDisciplinas } from "../../services/adminService";

export default function AreaMateria() {

  const [dados, setDados] = useState([]);

  const colunas = [
    { label: "ID", key: "id" },
    { label: "Matéria", key: "materia" },
    { label: "Ações", key: "acoes" },
  ];

  useEffect(() => {
    buscarDisciplinas();
  }, []);

  async function buscarDisciplinas() {

    try {

      const data = await getDisciplinas();

      const formatado = data.map((disciplina) => ({
        id: disciplina.id,
        materia: disciplina.nomeDisciplina,
        acoes: "Editar"
      }));

      setDados(formatado);

    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
    }

  }

  return (
    <div className={style.backgroundTabela}>

      <div className={style.topoTabela}>
        <BarraPesquisa placeholder="Pesquisar matéria..." />
        <Button>Adicionar Matéria</Button>
      </div>

      <h1>Matérias</h1>

      <Tabela colunas={colunas} dados={dados} />

    </div>
  );
}