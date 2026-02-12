import styles from "./Navbar.module.css";

export default function AdminMenu({ value, onChange }) {
    const items = [
        { id: "aluno", label: "Aluno" },
        { id: "professor", label: "Professor" },
        { id: "turma", label: "Turma" },
        { id: "materia", label: "Matéria" },
    ];

    return (
        <nav className={styles.adminMenu}>
        {items.map(item => (
            <button
            key={item.id}
            className={`${styles.adminItem} ${
                value === item.id ? styles.active : ""
            }`}
            onClick={() => onChange(item.id)}
            >
            {item.label}
            </button>
        ))}
        </nav>
    );
}
