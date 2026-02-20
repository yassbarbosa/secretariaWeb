import SelectField from "../SelectField/SelectField";
import Button from "../Button/Button";
import styles from "./ObservationModal.module.css";

export default function ObservationModal({ onSubmit }) {
    return (
        <>
        <h2 className={styles.titulo}>Cadastrar Observação</h2>

        <SelectField label="Série" />
        <SelectField label="Turma" />
        <SelectField label="Nome" />

        <div className={styles.textAreaContainer}>
            <label className={styles.label}>Observação</label>
            <textarea
            className={styles.textarea}
            placeholder="Digite a observação..."
            />
        </div>

        <Button onClick={onSubmit}>
            Cadastrar
        </Button>
        </>
    );
}
