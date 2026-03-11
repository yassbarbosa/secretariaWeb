import { useState } from "react";
import Button from "../Button/Button";
import styles from "../AddUserModal/AddUserModal.module.css";
import { addDisciplina } from "../../services/adminService";

export default function AddMateriaModal({ onClose, onSuccess }) {
  const [disciplina, setDisciplina] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!disciplina.trim()) {
      alert("Preencha o nome da matéria.");
      return;
    }

    setLoading(true);
    try {
      const response = await addDisciplina(disciplina);
      alert(response.message || "Matéria cadastrada com sucesso!");
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("Erro ao cadastrar matéria:", error);
      alert("Erro ao cadastrar matéria. Tente novamente.");
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
        <h2 className={styles.titulo}>Cadastrar Matéria</h2>

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