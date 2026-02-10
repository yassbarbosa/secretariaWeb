import styles from "./Login.module.css";
import logo from "../../assets/logo-aprendai.png";
import AuthLayout from "../Layout/AuthLayout";
import InputField from "../InputField/InputField";

export default function Login() {
  return (
    <AuthLayout>
      <div className={styles.iconeUsuario}>
        <img src={logo} alt="Aprendaí" />
      </div>

      <h1 className={styles.titulo}>Entrar</h1>
      <p className={styles.subtitulo}>Bem-vindo ao Aprendaí!</p>

      <form className={styles.formularioLogin}>
        <InputField label="Matrícula" />

        <InputField label="Senha" type="password" />

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
