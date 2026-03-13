import { useEffect, useState } from "react";
import Tabela from "../../components/Tabela/Tabela";
import Button from "../../components/Button/Button";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import style from "./AreaAdm.module.css";
import AddTurmaModal from "../../components/AddTurmaModal/AddTurmaModal";

import { getTurmas } from "../../services/adminService";

export default function AreaTurma() {
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [dados, setDados] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const colunas = [
    { label: "ID", key: "id" },
    { label: "Turma", key: "turma" },
    { label: "Ano", key: "ano" },
    { label: "Ações", key: "acoes" },
  ];

  const anosMap = {
    'ANO_1': '1º Ano',
    'ANO_2': '2º Ano',
    'ANO_3': '3º Ano',
    'ANO_4': '4º Ano',
    'ANO_5': '5º Ano',
    'ANO_6': '6º Ano',
    'ANO_7': '7º Ano',
    'ANO_8': '8º Ano',
    'ANO_9': '9º Ano',
    'ANO_10': '1º Ano Médio',
    'ANO_11': '2º Ano Médio',
    'ANO_12': '3º Ano Médio',
  };

  useEffect(() => {
    buscarTurmas();
  }, []);

  useEffect(() => {
    if (!termoPesquisa.trim()) {
      setDadosFiltrados(dados);
      return;
    }

    const termo = termoPesquisa.toLowerCase().trim();
    const filtrados = dados.filter(item => 
      item.turma?.toLowerCase().includes(termo) ||
      item.ano?.toLowerCase().includes(termo) ||
      item.id?.toString().includes(termo)
    );
    setDadosFiltrados(filtrados);
  }, [termoPesquisa, dados]);

  async function buscarTurmas() {
    try {
      const data = await getTurmas();
      const formatado = data.map((turma) => ({
        id: turma.id, 
        turma: turma.turma,
        ano: anosMap[turma.anoEscolar] || turma.anoEscolar,
        anoEscolar: turma.anoEscolar,
        acoes: (
          <Button onClick={() => abrirModal(turma)}>
            Editar
          </Button>
        )
      }));
      setDados(formatado);
      setDadosFiltrados(formatado);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    }
  }

  function handleSearch(valor) {
    setTermoPesquisa(valor);
  }

  function abrirModal(turma = null) {
    setTurmaSelecionada(turma);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  return (
    <div className={style.backgroundTabela}>
      <div className={style.topoTabela}>
        <BarraPesquisa 
          placeholder="Pesquisar turma por nome, ano ou ID..."
          onSearch={handleSearch}
        />
        <Button onClick={abrirModal}>Adicionar Turma</Button>
      </div>

      <h1>Turmas</h1>
      <Tabela colunas={colunas} dados={dadosFiltrados} />

      {modalAberto && (
        <AddTurmaModal 
          turma={turmaSelecionada}
          onClose={fecharModal}
          onSuccess={buscarTurmas}
        />
      )}
    </div>
  );
}