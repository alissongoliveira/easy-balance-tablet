import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function AcompanharComplemento() {
  const location = useLocation();
  const navigate = useNavigate();
  const complemento = location.state?.complemento;

  const [pesoAtual, setPesoAtual] = useState(0);

  useEffect(() => {
    if (!complemento?.balanca) {
      navigate("/home");
      return;
    }

    const socket = io("http://localhost:3000"); // Porta onde está seu servidor Express + Socket.IO

    socket.on("connect", () => {
      console.log("Conectado via Socket.IO");
    });

    socket.on("peso-balanca", (dados) => {
      console.log("Recebido do socket:", dados);

      if (
        dados.balanca?.toLowerCase().trim() ===
        complemento.balanca?.toLowerCase().trim()
      ) {
        setPesoAtual(dados.peso);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [complemento, navigate]);

  if (!complemento) return null;

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow w-full max-w-xl text-center space-y-10">
        <div>
          <p className="text-xl mb-2 font-medium">Peso Desejado:</p>
          <div className="bg-gray-200 text-black text-6xl font-bold border border-black py-3 px-6">
            {complemento.bruto_antes}
          </div>
        </div>
        <div>
          <p className="text-xl mb-2 font-medium">Peso Atual:</p>
          <div className="bg-gray-200 text-black text-6xl font-bold border border-black py-3 px-6">
            {pesoAtual}
          </div>
        </div>
      </div>
    </div>
  );
}
