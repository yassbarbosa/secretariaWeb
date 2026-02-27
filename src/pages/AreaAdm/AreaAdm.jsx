import Tabela from "../../components/Tabela/Tabela";
import style from "./AreaAdm.module.css";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import NavBar from "../../components/NavBar/Navbar";
export default function AreaProfessor() {
  return (
    <div className={style.principal}>
      <div>
        <NavBar role="admin"/>
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
    </div>
  </div>
  );
}
