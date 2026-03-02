import Tabela from "../../components/Tabela/Tabela";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import style from "./AreaAdm.module.css";

export default function AreaProfessor() {

  const colunas = [
    { label: "Registro", key: "registro" },
    { label: "Nome", key: "nome" },
    { label: "Disciplina", key: "disciplina" },
    { label: "E-mail", key: "email" },
    { label: "Ano escolar", key: "ano_escolar" },
    { label: "Ações", key: "acoes" },
  ];

  const dados = [
    { registro: "1", nome: "Carlos",     disciplina: "Matemática", email: "carlos@email", ano_escolar: "ano 1", acoes: "Editar" },
  ];

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