import styles from "./Navbar.module.css";
import AdminMenu from "./AdminMenu";
import logoBranca from "../../assets/logo-branca.png";

export default function Navbar({ role, adminView, setAdminView }) {
    return (
        <header className={styles.navbar}>
        <div className={styles.left}>
            <img src={logoBranca} alt="Logo" className={styles.logo} />
        </div>

        <div className={styles.center}>
            {role === "admin" && (
            <AdminMenu value={adminView} onChange={setAdminView} />
            )}
        </div>

        <div className={styles.avatar} />
        </header>
    );
}
