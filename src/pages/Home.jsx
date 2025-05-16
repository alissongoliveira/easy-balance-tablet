import { useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col relative">
      {/* Topo */}
      <div className="bg-white h-12 flex items-center justify-between px-4 shadow">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-6" />
          <span className="font-bold text-xs text-blue-800">EASY BALANCE</span>
        </div>
        <button onClick={handleLogout}>
          <ArrowRightOnRectangleIcon className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Conteúdo Central */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-center text-lg text-gray-700">
          Aguardando Novas Solicitações...
        </p>
      </div>

      {/* Rodapé */}
      <div className="absolute bottom-4 right-4 text-sm font-bold text-blue-800">
        EASY <span className="text-blue-400">BALANCE</span>
      </div>
    </div>
  );
}
