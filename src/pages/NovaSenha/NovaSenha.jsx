import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./NovaSenha.module.css";
import logo from "../../assets/logo-aprendai.png";
import AuthLayout from "../../components/Layout/AuthLayout";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { atualizarSenha } from "../../services/usuarioService";

export default function NovaSenha() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState(location.state?.email || "");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!email) {
      setErro("Digite seu e-mail");
      return;
    }

    if (!senhaAtual || !novaSenha) {
      setErro("Preencha todos os campos");
      return;
    }

    if (novaSenha.length < 6) {
      setErro("A nova senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      await atualizarSenha(email, senhaAtual, novaSenha);
      
      setSucesso("Senha atualizada com sucesso!");
      
      setEmail("");
      setSenhaAtual("");
      setNovaSenha("");
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      
      if (error.response?.status === 401) {
        setErro("Senha atual incorreta");
      } else if (error.response?.status === 404) {
        setErro("E-mail não encontrado");
      } else if (error.response?.data?.message) {
        setErro(error.response.data.message);
      } else {
        setErro("Erro ao atualizar senha. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.iconeUsuario}>
        <img src={logo} alt="Aprendaí" />
      </div>

      <h1 className={styles.titulo}>Nova senha</h1>
      <p className={styles.subtitulo}>
        Digite seu e-mail e crie uma nova senha
      </p>

      {erro && <div className={styles.erro}>{erro}</div>}
      {sucesso && <div className={styles.sucesso}>{sucesso}</div>}

      <form className={styles.formularioLogin} onSubmit={handleSubmit}>
        <InputField
          label="E-mail"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="seu@email.com"
          required
        />

        <InputField
          label="Senha atual"
          type="password"
          value={senhaAtual}
          onChange={setSenhaAtual}
          required
        />

        <InputField
          label="Nova senha"
          type="password"
          value={novaSenha}
          onChange={setNovaSenha}
          required
        />

        <a href="/" className={styles.esqueciSenha}>
          Voltar para o login
        </a>

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar senha"}
        </Button>
      </form>
    </AuthLayout>
  );
}