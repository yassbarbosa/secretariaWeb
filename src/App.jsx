import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import NovaSenha from "./components/NovaSenha/NovaSenha";
import AreaProfessor from "./pages/AreaProfessor/AreaProfessor";
import Tabela from "./components/Tabela/Tabela";
import Button from "./components/Button/Button";
import BarraPesquisa from "./components/BarraPesquisa/BarraPesquisa"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/nova-senha" element={<NovaSenha />} />
        <Route path="/area-professor" element={<AreaProfessor />} />

        <Route path="/tabela" element={<Tabela />} />
        <Route path="/button" element={<Button />} />
        <Route path="/barra-pesquisa" element={<BarraPesquisa />} />
      </Routes>
    </BrowserRouter>
  );
}
