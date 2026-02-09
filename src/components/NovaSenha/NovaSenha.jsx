import styles from "./NovaSenha.module.css";
import logo from "../../assets/logo-aprendai.png";
import AuthLayout from "../Layout/AuthLayout";

export default function NovaSenha() {
  return (
    <AuthLayout>
      <div className={styles.iconeUsuario}>
        <img src={logo} alt="Aprendaí" />
      </div>

      <h1 className={styles.titulo}>Nova senha</h1>
      <p className={styles.subtitulo}>
        Crie uma nova senha para continuar
      </p>

      <form className={styles.formularioLogin}>
        <label className={styles.campo}>
          Nova senha
          <input type="password" />
        </label>

        <label className={styles.campo}>
          Confirmar senha
          <input type="password" />
        </label>

        <button type="submit" className={styles.botaoEntrar}>
          Salvar senha
        </button>
      </form>

      <a href="/" className={styles.esqueciSenha}>
        Voltar para o login
      </a>
    </AuthLayout>
  );
}
