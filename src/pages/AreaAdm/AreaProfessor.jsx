import { useEffect, useState } from "react";
import Tabela from "../../components/Tabela/Tabela";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import style from "./AreaAdm.module.css";

export default function AreaProfessor() {

  const [dados, setDados] = useState([]);

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

  async function buscarProfessores() {

    const response = await fetch(
      "https://aprendeaiapi-pw5p.onrender.com/api/admin/getProfessor"
    );

    const data = await response.json();

    const formatado = data.map((prof) => ({
      registro: prof.matricula,
      nome: prof.nomeCompleto,
      disciplina: prof.nomeDisciplina,
      email: prof.email,
      ano_escolar: prof.anoEscolar,
      acoes: "Editar"
    }));

    setDados(formatado);
  }

  return (
    <div className={style.backgroundTabela}>

      <div className={style.topoTabela}>
        <BarraPesquisa placeholder="Pesquisar professor..." />
        <Button>Adicionar Professor</Button>
      </div>

      <h1>Professores</h1>

      <Tabela colunas={colunas} dados={dados} />

    </div>
  );
}