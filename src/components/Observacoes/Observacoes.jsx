import { useState } from "react";
import style from "./Observacoes.module.css";
import iconeLixeira from "../../assets/icone_lixeira.png";
import Button from "../Button/Button";

export default function Observacoes() {

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
            
            <button
              className={style.iconeLixeira}
              onClick={() => removerObservacao(obs.id)}
            >
              <img src={iconeLixeira} alt="Excluir" />
            </button>
  
            <h4>{obs.aluno}</h4>
            <p>{obs.texto}</p>
            <span>{obs.data}</span>
          </div>
        ))}
      </div>
  
      {/* BOTÃO FLUTUANTE */}
      <button
        className={style.botaoFlutuante}
        onClick={handleAdicionar}
      >
        +
      </button>
  
    </div>
  );
}