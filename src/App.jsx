import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="text-center p-4 text-lg font-bold">
              Easy Balance - Tablet
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
