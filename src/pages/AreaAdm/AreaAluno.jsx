import { useEffect, useState } from "react";
import Tabela from "../../components/Tabela/Tabela";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import style from "./AreaAdm.module.css";

export default function AreaAluno() {

  const [dadosAluno, setDadosAluno] = useState([]);

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

  async function buscarAlunos() {

    const response = await fetch(
      "https://aprendeaiapi-pw5p.onrender.com/api/admin/getAlunos"
    );

    const data = await response.json();

    const formatado = data.map((aluno) => ({
      matricula: aluno.matricula,
      nome: aluno.nomeCompleto,
      cpf: aluno.cpf,
      email: aluno.email,
      serie: aluno.anoEscolar,
      acoes: "Editar"
    }));

    setDadosAluno(formatado);
  }

  return (
    <div className={style.backgroundTabela}>

      <div className={style.topoTabela}>
        <BarraPesquisa placeholder="Pesquisar..." />
        <Button>Adicionar Aluno</Button>
      </div>

      <h1>Alunos</h1>

      <Tabela colunas={colunasAluno} dados={dadosAluno} />

    </div>
  );
}