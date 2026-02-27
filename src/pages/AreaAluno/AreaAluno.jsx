import Tabela from "../../components/Tabela/Tabela";
import style from "./AreaAluno.module.css";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import Observacoes from "../../components/Observacoes/Observacoes";
import NavBar from "../../components/NavBar/Navbar";

export default function AreaAluno() {
  return (
    <div className={style.principal}>
      <div>
        <NavBar/>
        <div className={style.foto}>
        <img src="caminho/para/foto_do_aluno.jpg" alt="" />
        </div>

      </div>
      <h2>Perfil</h2>
      <h5>Aluno</h5>
      <div className={style.container}>
        <div className={style.backgroundTabela}>

          <div className={style.topoTabela}>
            <BarraPesquisa placeholder="Pesquisar matéria..." />
          </div>

          <div className={style.titulo}>
            <h1>Notas</h1>
            <Tabela />
          </div>

        </div>
      <Observacoes/>
    </div>
  </div>
  
  );
}
