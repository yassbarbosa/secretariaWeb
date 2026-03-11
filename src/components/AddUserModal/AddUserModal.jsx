import { useState } from "react";
import Button from "../Button/Button";
import styles from "./AddUserModal.module.css";
import { addUsuario } from "../../services/adminService";

export default function AddUserModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    matricula: "",
    nomeCompleto: "",
    cpf: "",
    email: "",
    tipoUsuario: "ALUNO",
    responsavel: "",
    telefoneResponsavel: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.matricula || !formData.nomeCompleto || !formData.cpf || !formData.email) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    if (!formData.responsavel || !formData.telefoneResponsavel) {
      alert("Preencha responsável e telefone do responsável.");
      return;
    }

    setLoading(true);
    try {
      const response = await addUsuario(formData);
      alert(response.message || "Usuário cadastrado com sucesso!");
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário. Tente novamente.");
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
        <h2 className={styles.titulo}>Cadastrar Aluno</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Matrícula *</label>
            <input
              type="text"
              name="matricula"
              value={formData.matricula}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Nome Completo *</label>
            <input
              type="text"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>CPF *</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>E-mail *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Responsável *</label>
            <input
              type="text"
              name="responsavel"
              value={formData.responsavel}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Telefone do Responsável *</label>
            <input
              type="text"
              name="telefoneResponsavel"
              value={formData.telefoneResponsavel}
              onChange={handleChange}
              className={styles.input}
              required
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