import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AcompanharComplemento from "./pages/AcompanharComplemento";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/acompanhar"
          element={
            <ProtectedRoute>
              <AcompanharComplemento />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
