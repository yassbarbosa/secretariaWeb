import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import NovaSenha from "./components/NovaSenha/NovaSenha";
import AreaProfessor from "./pages/AreaProfessor/AreaProfessor";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/nova-senha" element={<NovaSenha />} />
        <Route path="/area-professor" element={<AreaProfessor />} />
      </Routes>
    </BrowserRouter>
  );
}
