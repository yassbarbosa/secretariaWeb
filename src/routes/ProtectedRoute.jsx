import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {

  const tipoUsuario = localStorage.getItem("tipoUsuario");

  if (!tipoUsuario) {
    return <Navigate to="/" replace />;
  }

  if (role && role !== tipoUsuario) {

    if (tipoUsuario === "ADMIN") {
      return <Navigate to="/area-adm" replace />;
    }

    if (tipoUsuario === "PROFESSOR") {
      return <Navigate to="/area-professor" replace />;
    }

    if (tipoUsuario === "ALUNO") {
      return <Navigate to="/area-aluno" replace />;
    }
  }

  return children;
}