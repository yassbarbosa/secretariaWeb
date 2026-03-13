import { useState } from "react";
import style from "./AreaAdm.module.css";
import NavBar from "../../components/NavBar/Navbar";
import AreaAluno from "./AreaAluno";
import AreaProfessor from "./AreaProfessor";
import AreaTurma from "./AreaTurma";
import AreaMateria from "./AreaMateria";

export default function AreaAdmin() {
  const [adminView, setAdminView] = useState("aluno");

  function renderAdminArea() {
    switch (adminView) {
      case "aluno":
        return <AreaAluno />;
      case "professor":
        return <AreaProfessor />;
      case "turma":
        return <AreaTurma />;
      case "materia":
        return <AreaMateria />;
      default:
        return <AreaAluno />;
    }
  }

  return (
    <div className={style.principal}>
      <NavBar
        role="admin"
        adminView={adminView}
        setAdminView={setAdminView}
      />

      <div className={style.foto}>
        <img src="caminho/para/foto_do_admin.jpg" alt="" />
      </div>

      <h2>Perfil</h2>
      <h5>Admin</h5>

      <div className={style.container}>
        {renderAdminArea()}
      </div>
    </div>
  );
}