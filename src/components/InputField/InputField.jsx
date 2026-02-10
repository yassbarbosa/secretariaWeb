import styles from "./InputField.module.css";

export default function InputField({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    ...props
}) {
    return (
        <label className={styles.campo}>
        {label}

        <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            {...props}
        />
        </label>
    );
}
