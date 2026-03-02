import Tabela from "../../components/Tabela/Tabela";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import style from "./AreaAdm.module.css";

export default function AreaMateria() {

  const colunas = [
    { label: "ID", key: "id" },
    { label: "Matéria", key: "materia" },
    { label: "Ações", key: "acoes" },
  ];

  const dados = [
    { id: "1", materia: "Matemática", acoes: "Editar" },
  ];

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