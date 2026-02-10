import styles from "./SelectField.module.css";

export default function SelectField({
    label,
    value,
    onChange,
    options,
}) {
    return (
        <label className={styles.campo}>
        {label}

        <select
            className={styles.select}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="" disabled>
            Selecione...
            </option>

            {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
                {opt.label}
            </option>
            ))}
        </select>
        </label>
    );
}
