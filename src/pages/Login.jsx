import { useState } from "react";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (usuario.trim() && senha.trim()) {
      localStorage.setItem("usuario", usuario);
      window.location.href = "/home";
    } else {
      alert("Preencha usuário e senha");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center relative">
      {/* Formulário */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center">
        {/* Logotipo */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src="/logo.png" alt="Logo" className="h-12" />
        </div>

        <h1 className="text-lg font-bold text-blue-800 mb-6">
          EASY <span className="text-blue-400">BALANCE</span>
        </h1>

        {/* Campos de login */}
        <div className="space-y-3 text-left">
          <input
            type="text"
            placeholder="Usuário:"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full px-3 py-2 bg-gray-200 rounded outline-none"
          />
          <input
            type="password"
            placeholder="Senha:"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-3 py-2 bg-gray-200 rounded outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900"
          >
            Entrar
          </button>
        </div>
      </div>

      {/* Marca d’água */}
      <div className="absolute bottom-4 right-4 text-sm font-bold text-blue-800">
        EASY <span className="text-blue-400">BALANCE</span>
      </div>
    </div>
  );
}
