import { useState } from "react";
import style from "./Observacoes.module.css";
import iconeLixeira from "../../assets/icone_lixeira.png";
import ObservationModal from "../ObservationModal/ObservationModal";

export default function Observacoes({ role }) {
  const [modalAberto, setModalAberto] = useState(false);

  function abrirModal() {
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  const [observacoes, setObservacoes] = useState([
    {
      id: 1,
      aluno: "João Silva",
      texto: "Aluno apresentou melhora significativa na participação.",
      data: "22/02/2026"
    },
    {
      id: 2,
      aluno: "Maria Souza",
      texto: "Precisa melhorar foco em sala.",
      data: "21/02/2026"
    }
  ]);

  const removerObservacao = (id) => {
    setObservacoes((prev) => prev.filter((obs) => obs.id !== id));
  };

  const handleAdicionar = () => {
    // aqui depois você conecta com seu popup
    console.log("Abrir popup");
  };

  return (
    <div className={style.backgroundObservacao}>
  
      <h1>Observações</h1>
  
      <div className={style.listaObservacoes}>
        {observacoes.map((obs) => (
          <div key={obs.id} className={style.cardObservacao}>
            
            {role === "professor" && (
              <button
                className={style.iconeLixeira}
                onClick={() => removerObservacao(obs.id)}
              >
                <img src={iconeLixeira} alt="Excluir" />
              </button>
            )}
  
            <h4>{obs.aluno}</h4>
            <p>{obs.texto}</p>
            <span>{obs.data}</span>
          </div>
        ))}
      </div>
  
      {/* BOTÃO FLUTUANTE */}
      {role === "professor" && (
        <button
          className={style.botaoFlutuante}
          onClick={abrirModal}
        >
          +
        </button>
      )}

      {modalAberto && (
        <div
          className={style.overlay}
          onClick={fecharModal}
        >
          <div
            className={style.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <ObservationModal onSubmit={fecharModal} />
          </div>
        </div>
      )}
  
    </div>
  );
}