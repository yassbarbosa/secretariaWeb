import { useState } from "react";
import Button from "../Button/Button";
import styles from "../AddUserModal/AddUserModal.module.css";
import { addTurma } from "../../services/adminService";

export default function AddTurmaModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    turma: "",
    anoEscolar: "ANO_1"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.turma || !formData.anoEscolar) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      const response = await addTurma(formData);
      alert(response.message || "Turma cadastrada com sucesso!");
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("Erro ao cadastrar turma:", error);
      alert("Erro ao cadastrar turma. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const anosEscolares = [
    { value: "ANO_1", label: "1º Ano" },
    { value: "ANO_2", label: "2º Ano" },
    { value: "ANO_3", label: "3º Ano" },
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.titulo}>Cadastrar Turma</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Nome da Turma *</label>
            <input
              type="text"
              name="turma"
              value={formData.turma}
              onChange={handleChange}
              className={styles.input}
              placeholder="Ex: Turma A, 101, etc."
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Ano Escolar *</label>
            <select
              name="anoEscolar"
              value={formData.anoEscolar}
              onChange={handleChange}
              className={styles.select}
              required
            >
              {anosEscolares.map(ano => (
                <option key={ano.value} value={ano.value}>
                  {ano.label}
                </option>
              ))}
            </select>
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