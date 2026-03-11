import { useEffect, useState } from "react";
import Tabela from "../../components/Tabela/Tabela";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import style from "./AreaAdm.module.css";
import AddMateriaModal from "../../components/AddMateriaModal/AddMateriaModal";

import { getDisciplinas } from "../../services/adminService";

export default function AreaMateria() {
  const [dados, setDados] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const colunas = [
    { label: "ID", key: "id" },
    { label: "Matéria", key: "materia" },
    { label: "Ações", key: "acoes" },
  ];

  useEffect(() => {
    buscarDisciplinas();
  }, []);

  useEffect(() => {
    if (!termoPesquisa.trim()) {
      setDadosFiltrados(dados);
      return;
    }

    const termo = termoPesquisa.toLowerCase().trim();
    const filtrados = dados.filter(item => 
      item.materia?.toLowerCase().includes(termo) ||
      item.id?.toString().includes(termo)
    );
    setDadosFiltrados(filtrados);
  }, [termoPesquisa, dados]);

  async function buscarDisciplinas() {
    try {
      const data = await getDisciplinas();
      const formatado = data.map((disciplina) => ({
        id: disciplina.id,
        materia: disciplina.nomeDisciplina,
        acoes: "Editar"
      }));
      setDados(formatado);
      setDadosFiltrados(formatado);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
    }
  }

  function handleSearch(valor) {
    setTermoPesquisa(valor);
  }

  function abrirModal() {
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  return (
    <div className={style.backgroundTabela}>
      <div className={style.topoTabela}>
        <BarraPesquisa 
          placeholder="Pesquisar matéria por nome ou ID..."
          onSearch={handleSearch}
        />
        <Button onClick={abrirModal}>Adicionar Matéria</Button>
      </div>

      <h1>Matérias</h1>
      <Tabela colunas={colunas} dados={dadosFiltrados} />

      {modalAberto && (
        <AddMateriaModal 
          onClose={fecharModal}
          onSuccess={buscarDisciplinas}
        />
      )}
    </div>
  );
}