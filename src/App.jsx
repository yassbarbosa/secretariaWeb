import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import NovaSenha from "./components/NovaSenha/NovaSenha";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/nova-senha" element={<NovaSenha />} />
      </Routes>
    </BrowserRouter>
  );
}
