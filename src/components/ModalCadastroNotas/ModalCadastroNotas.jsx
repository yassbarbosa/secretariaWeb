import SelectField from "../SelectField/SelectField";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import styles from "./ModalCadastroNotas.module.css";

export default function GradeModal({ onSubmit }) {
    return (
      <>
        <h2 className={styles.titulo}>Cadastrar Nota</h2>

        <SelectField label="Série" />
        <SelectField label="Turma" />
        <SelectField label="Nome" />

        <div className={styles.notas}>
            <InputField label="N1" />
            <InputField label="N2" />

            <div className={styles.recuperacao}>
              <label className={styles.recuperacaoLabel}>
                Recuperação
              </label>

              <div className={styles.recuperacaoRow}>
                <input type="checkbox" />

                <input
                  type="text"
                  disabled
                />
              </div>
            </div>
          </div>

        <InputField label="Média" disabled />

        <Button onClick={onSubmit}>
          Cadastrar
        </Button>
      </>
    );
}
