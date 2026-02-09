import styles from "./AuthLayout.module.css";

export default function AuthLayout({ children }) {
  return (
    <div className={styles.fundo}>
      <div className={styles.modalLogin}>
        {children}
      </div>
    </div>
  );
}
