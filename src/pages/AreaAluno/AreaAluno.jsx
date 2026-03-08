import { useEffect, useState } from "react";
import Tabela from "../../components/Tabela/Tabela";
import style from "./AreaAluno.module.css";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import Observacoes from "../../components/Observacoes/Observacoes";
import NavBar from "../../components/NavBar/Navbar";
import { getObservacaoAluno, getNotasAluno } from "../../services/alunoService";

export default function AreaAluno() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const [notas,setNotas] = useState([]);
  const [observacoes,setObservacoes] = useState([]);

  const colunas = [
    { label: "Matéria", key: "disciplina" },
    { label: "N1", key: "n1" },
    { label: "N2", key: "n2" },
    { label: "Média", key: "media" }
  ];

  useEffect(() => {
    async function carregarDados() {
      try {

        const obs = await getObservacaoAluno(usuario.id);
        const notasApi = await getNotasAluno(usuario.id);

        const observacoesFormatadas = obs.map((o) => ({
          id: o.id,
          aluno: o.nomeAluno,
          texto: o.observacao,
          data: o.dataRegistro
        }));

        const notasFormatadas = notasApi.map((n) => ({
          disciplina: n.nomeDisciplina,
          n1: n.n1,
          n2: n.n2,
          media: n.media
        }));

        setObservacoes(observacoesFormatadas);
        setNotas(notasFormatadas);

      } catch (error) {
        console.error(error);
      }
    }

    carregarDados();

  }, []);

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
            <Tabela colunas={colunas} dados={notas} />
          </div>

        </div>
      <Observacoes dados={observacoes} />
    </div>
  </div>
  
  );
}
