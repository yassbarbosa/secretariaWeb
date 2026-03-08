import Tabela from "../../components/Tabela/Tabela";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import style from "./AreaAdm.module.css";

export default function AreaTurma() {

  const colunas = [
    { label: "ID", key: "id" },
    { label: "Turma", key: "turma" },
    { label: "Ano", key: "ano" },
    { label: "Ações", key: "acoes" },
  ];

  const dados = [
    { id: "1", turma: "3º A", ano: "2026", acoes: "Editar" },
  ];

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