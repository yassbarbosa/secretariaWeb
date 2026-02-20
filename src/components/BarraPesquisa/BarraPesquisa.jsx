import { useState } from "react";
import styles from "./BarraPesquisa.module.css";

export default function BarraPesquisa({
  placeholder = "Pesquisar...",
  onSearch,
  className = ""
}) {
    const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);

    // Dispara busca automática enquanto digita (opcional)
    if (onSearch) {
      onSearch(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  }

  return (
<form className={`${styles.container} ${className}`} onSubmit={handleSubmit}>
        <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        🔍
      </button>
    </form>
  );
}
