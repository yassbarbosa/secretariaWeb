import { useState, useRef, useEffect } from "react";
import styles from "./SelectField.module.css";

export default function SelectField({ label, options = [] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <label className={styles.label}>{label}</label>

      <button
        type="button"
        className={`${styles.field} ${open ? styles.open : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>Selecione</span>
        <span className={styles.arrow} />
      </button>

      {open && (
        <ul className={styles.options}>
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => setOpen(false)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
