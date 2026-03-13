import { useState, useEffect } from "react";
import Button from "../Button/Button";
import styles from "./ObservationModal.module.css";
import SelectField from "../SelectField/SelectField";

export default function ObservationModal({ idProfessor, onSubmit, reloadObservacoes }){
  const [alunos, setAlunos] = useState([]);
  const [idAluno, setIdAluno] = useState("");
  const [observacao, setObservacao] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buscarAlunos();
  }, []);

  const buscarAlunos = async () => {
    try {

      const response = await fetch(
        `https://aprendeaiapi-pw5p.onrender.com/api/professor/getAlunosByProfessor?professorId=${idProfessor}`
      );

      const data = await response.json();
      
      console.log("Resposta da API:", data);

      setAlunos(data);

    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  const handleSubmit = async () => {

    if (!idAluno || !observacao) {
      alert("Selecione um aluno e escreva uma observação.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "https://aprendeaiapi-pw5p.onrender.com/api/professor/addObservacao",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idAluno: Number(idAluno),
            idProfessor: Number(idProfessor),
            observacao: observacao
          })
        }
      );

      const data = await response.json();

      alert(data.message || "Observação cadastrada!");

      setObservacao("");
      setIdAluno("");

    } catch (error) {
      console.error("Erro ao cadastrar observação:", error);
      alert("Erro ao cadastrar observação");

    } finally {
      setLoading(false);
    }
    if (reloadObservacoes) {
      reloadObservacoes();
    }

    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className={styles.container}>

      <h2 className={styles.titulo}>Cadastrar Observação</h2>

      <div className={styles.selectContainer}>
        <label className={styles.label}>Aluno</label>

        <select
          className={styles.select}
          value={idAluno}
          onChange={(e) => setIdAluno(e.target.value)}
        >
          <option value="">Selecione um aluno</option>

          {alunos.map((aluno) => (
            <option key={aluno.idAluno} value={aluno.idAluno}>
              {aluno.nomeCompleto}
            </option>
          ))}

        </select>
      </div>

      <div className={styles.textAreaContainer}>
        <label className={styles.label}>Observação</label>

        <textarea
          className={styles.textarea}
          placeholder="Digite a observação..."
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
        />
      </div>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Salvando..." : "Cadastrar"}
      </Button>

    </div>
  );
}