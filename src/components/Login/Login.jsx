import styles from "./Login.module.css";
import logo from "../../assets/logo-aprendai.png";
import AuthLayout from "../Layout/AuthLayout";

export default function Login() {
  return (
    <AuthLayout>
      <div className={styles.iconeUsuario}>
        <img src={logo} alt="Aprendaí" />
      </div>

      <h1 className={styles.titulo}>Entrar</h1>
      <p className={styles.subtitulo}>Bem-vindo ao Aprendaí!</p>

      <form className={styles.formularioLogin}>
        <label className={styles.campo}>
          Matrícula
          <input type="text" />
        </label>

        <label className={styles.campo}>
          Senha
          <input type="password" />
        </label>

        <a href="/nova-senha" className={styles.esqueciSenha}>
          Esqueceu sua senha?
        </a>

        <button type="submit" className={styles.botaoEntrar}>
          Entrar
        </button>
      </form>
    </AuthLayout>
  );
}
