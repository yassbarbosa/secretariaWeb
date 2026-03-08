import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import NovaSenha from "./pages/NovaSenha/NovaSenha";
import AreaProfessor from "./pages/AreaProfessor/AreaProfessor";
import AreaAluno from "./pages/AreaAluno/AreaAluno";
import AreaAdm from "./pages/AreaAdm/AreaAdm";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/nova-senha" element={<NovaSenha />} />

        <Route
          path="/area-professor"
          element={
            <ProtectedRoute role="PROFESSOR">
              <AreaProfessor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/area-adm"
          element={
            <ProtectedRoute role="ADMIN">
              <AreaAdm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/area-aluno"
          element={
            <ProtectedRoute role="ALUNO">
              <AreaAluno />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}