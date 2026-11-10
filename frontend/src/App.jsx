
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ClientePage from "./pages/ClientePage.jsx";
import VeiculosPage from "./pages/VeiculosPage.jsx";
import AgendamentosPage from "./pages/AgendamentosPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/clientes" element={<ClientePage />} />
        <Route path="/veiculos" element={<VeiculosPage />} />
        <Route path="/agendamentos" element={<AgendamentosPage />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
