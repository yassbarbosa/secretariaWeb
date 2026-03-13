import { useState } from "react";
import style from "./Observacoes.module.css";
import iconeLixeira from "../../assets/icone_lixeira.png";
import ObservationModal from "../ObservationModal/ObservationModal";

export default function Observacoes({ role, dados, idProfessor, reloadObservacoes}) {
  const [modalAberto, setModalAberto] = useState(false);

  function abrirModal() {
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  const removerObservacao = (id) => {
    console.log("remover observação", id);
    
  };

  return (
    <div className={style.backgroundObservacao}>
  
      <h1>Observações</h1>
  
      <div className={style.listaObservacoes}>
        {dados?.map((obs) => (
          <div key={obs.id} className={style.cardObservacao}>

            {role === "professor" && (
              <button
                className={style.iconeLixeira}
                onClick={() => removerObservacao(obs.id)}
              >
                <img src={iconeLixeira} alt="Excluir" />
              </button>
            )}

            <h4>{obs.nomeAluno}</h4>
            <p>{obs.observacao}</p>
            <span>
              {new Date(obs.dataRegistro).toLocaleDateString("pt-BR")}
            </span>
          </div>
        ))}
      </div>
  
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
          <ObservationModal
            idProfessor={idProfessor}
            onSubmit={fecharModal}
            reloadObservacoes={reloadObservacoes}
          />          
          </div>
        </div>
      )}
  
    </div>
  );
}