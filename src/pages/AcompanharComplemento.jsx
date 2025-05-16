import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function AcompanharComplemento() {
  const location = useLocation();
  const navigate = useNavigate();
  const complemento = location.state?.complemento;

  const [pesoAtual, setPesoAtual] = useState(0);
  const [finalizando, setFinalizando] = useState(false);

  const operador = localStorage.getItem("usuario");

  useEffect(() => {
    if (!complemento?.balanca) {
      navigate("/home");
      return;
    }

    const socket = io("http://localhost:3000");

    socket.on("peso-balanca", (dados) => {
      if (
        dados.balanca?.toLowerCase().trim() ===
        complemento.balanca?.toLowerCase().trim()
      ) {
        setPesoAtual(dados.peso);
      }
    });

    return () => socket.disconnect();
  }, [complemento, navigate]);

  const finalizarComplemento = async () => {
    if (!operador) {
      alert("Operador não identificado.");
      return;
    }

    const confirmacao = confirm("Finalizar complemento com este peso?");
    if (!confirmacao) return;

    try {
      setFinalizando(true);

      const payload = {
        bruto_depois: pesoAtual,
        tara: complemento.tara,
        liquido: pesoAtual - complemento.tara,
        operador: operador,
      };

      const res = await fetch(
        `http://localhost:3000/complementos/${complemento.id}/finalizar`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Erro ao finalizar complemento.");

      alert("Complemento finalizado com sucesso.");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Erro ao finalizar complemento.");
    } finally {
      setFinalizando(false);
    }
  };

  if (!complemento) return null;

  const pesoSuficiente = pesoAtual >= complemento.bruto_antes;

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

        {pesoSuficiente && (
          <button
            onClick={finalizarComplemento}
            disabled={finalizando}
            className="bg-green-700 text-white px-6 py-2 text-lg rounded hover:bg-green-800 disabled:opacity-50"
          >
            {finalizando ? "Finalizando..." : "Finalizar"}
          </button>
        )}
      </div>
    </div>
  );
}
