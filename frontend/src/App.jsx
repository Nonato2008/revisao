import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ClientePage from "./pages/ClientePage.jsx";
import VeiculosPage from "./pages/VeiculosPage.jsx";
import AgendamentosPage from "./pages/AgendamentosPage.jsx";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            localStorage.getItem("token") ? <Navigate to="/clientes" replace /> : <LoginPage />
          }
        />

        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <ClientePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/veiculos"
          element={
            <ProtectedRoute>
              <VeiculosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agendamentos"
          element={
            <ProtectedRoute>
              <AgendamentosPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
