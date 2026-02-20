import styles from "./Button.module.css";

export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.botao} ${className}`}
    >
      {children}
    </button>
  );
}
