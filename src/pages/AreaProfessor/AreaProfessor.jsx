import Tabela from "../../components/Tabela/Tabela";
import style from "./AreaProfessor.module.css";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import Observacoes from "../../components/Observacoes/Observacoes";

export default function AreaProfessor() {
  return (
    <div className={style.principal}>
      <div className={style.nav}>
        <div className={style.foto}>
        <img src="caminho/para/foto_do_professor.jpg" alt="" />
        </div>

      </div>
      <h2>Perfil</h2>
      <h5>Professor</h5>
      <div className={style.container}>
        <div className={style.backgroundTabela}>

          <div className={style.topoTabela}>
            <BarraPesquisa placeholder="Pesquisar..." />
            <Button className={style.botaoAdicionar}>
              Adicionar Nota
            </Button>
          </div>

          <div className={style.titulo}>
            <h1>Notas</h1>
            <Tabela />
          </div>

        </div>
      <Observacoes />
    </div>
  </div>
  
  );
}
