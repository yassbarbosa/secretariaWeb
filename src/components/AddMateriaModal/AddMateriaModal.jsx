import { useState } from "react";
import Button from "../Button/Button";
import styles from "../AddUserModal/AddUserModal.module.css";
import { addDisciplina, updateDisciplina } from "../../services/adminService";

export default function AddMateriaModal({ materia, onClose, onSuccess }) {
  const [disciplina, setDisciplina] = useState(materia?.nomeDisciplina || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!disciplina.trim()) {
      alert("Preencha o nome da matéria.");
      return;
    }
    setLoading(true);
    try {
      let response;

      if (materia) {
        response = await updateDisciplina({
          id: materia.id,
          nomeDisciplina: disciplina
        });
      } else {
        response = await addDisciplina(disciplina);
      }

      alert(response.message || "Operação realizada com sucesso!");
      onSuccess?.();
      onClose?.();

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar matéria.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.titulo}>
          {materia ? "Editar Matéria" : "Cadastrar Matéria"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Nome da Matéria *</label>
            <input
              type="text"
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
              className={styles.input}
              placeholder="Ex: Matemática, Português, História..."
              required
              autoFocus
            />
          </div>

          <div className={styles.botoesContainer}>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Cadastrar"}
            </Button>
            <Button type="button" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}