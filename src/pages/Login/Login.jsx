import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../../assets/logo-aprendai.png";
import AuthLayout from "../../components/Layout/AuthLayout";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { login } from "../../services/usuarioService";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email,senha);
      localStorage.setItem("usuario", JSON.stringify(response));

      const tipo = response.tipoUsuario;

      if (tipo == "ALUNO") {
        navigate("/area-aluno");
      }

      if (tipo == "PROFESSOR") {
        navigate("/area-professor");
      }

      if (tipo == "ADMIN") {
        navigate("/area-adm");
      }
    } catch (error) {
      console.error("Erro no login",error);
    }
  }

  return (
    <AuthLayout>
      <div className={styles.iconeUsuario}>
        <img src={logo} alt="Aprendaí" />
      </div>

      <h1 className={styles.titulo}>Entrar</h1>
      <p className={styles.subtitulo}>Bem-vindo ao Aprendaí!</p>

      <form className={styles.formularioLogin} onSubmit={handleLogin}>
        <InputField
          label="E-mail"
          value={email}
          onChange={(value) => setEmail(value)}
        />

        <InputField
          label="Senha"
          type="password"
          value={senha}
          onChange={(value) => setSenha(value)}
        />

        <a href="/nova-senha" className={styles.esqueciSenha}>
          Esqueceu sua senha?
        </a>
        <Button type="submit" className={styles.botaoMedio}>
  Entrar
</Button>
      </form>
    </AuthLayout>
  );
}
