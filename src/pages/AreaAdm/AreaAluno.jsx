import Tabela from "../../components/Tabela/Tabela";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import style from "./AreaAdm.module.css";

export default function AreaAluno() {

  const colunasAluno = [
    { label: "Matrícula", key: "matricula" },
    { label: "Nome", key: "nome" },
    { label: "CPF", key: "cpf" },
    { label: "E-mail", key: "email" },
    { label: "Série", key: "serie" },
    { label: "Ações", key: "acoes" },
  ];

  const dadosAluno = [
    { matricula: "123456", nome: "João", cpf: "123", email: "joao@teste", serie: "1°", acoes: "Editar" }
  ];

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