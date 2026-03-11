import { useState, useRef, useEffect } from "react";
import styles from "./SelectField.module.css";

export default function SelectField({ 
  label, 
  options = [], 
  value, 
  onChange,
  disabled 
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : "Selecione";

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    if (onChange) {
      onChange(option.value);
    }
    setOpen(false);
  };

  return (
    <div className={`${styles.container} ${disabled ? styles.disabled : ""}`} ref={ref}>
      <label className={styles.label}>{label}</label>

      <button
        type="button"
        className={`${styles.field} ${open ? styles.open : ""} ${value ? styles.hasValue : ""}`}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
      >
        <span className={value ? styles.valueText : styles.placeholderText}>
          {displayText}
        </span>
        <span className={`${styles.arrow} ${open ? styles.arrowOpen : ""}`} />
      </button>

      {open && !disabled && (
        <ul className={styles.options}>
          {options.length > 0 ? (
            options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt)}
                className={`${styles.option} ${opt.value === value ? styles.selectedOption : ""}`}
              >
                {opt.label}
              </li>
            ))
          ) : (
            <li className={styles.noOptions}>Nenhuma opção disponível</li>
          )}
        </ul>
      )}
    </div>
  );
}