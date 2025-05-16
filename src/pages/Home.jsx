import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import SolicitacaoCard from "../components/SolicitacaoCard";

export default function Home() {
  const navigate = useNavigate();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Carrega Solicitações
  const carregarSolicitacoes = async () => {
    try {
      setCarregando(true);
      const res = await fetch("http://localhost:3000/complementos");
      const dados = await res.json();

      console.log("Complementos recebidos:", dados);

      const pendentes = dados.filter((c) => c.status === "Pendente");
      setSolicitacoes(pendentes);
    } catch (err) {
      console.error("Erro ao carregar solicitações:", err);
      alert("Erro ao carregar solicitações.");
    } finally {
      setCarregando(false); // Aqui Garante que a tela destrave mesmo com erro
    }
  };

  // Atualiza Status das Solicitações
  const atualizarStatus = async (id, acao) => {
    const rota = `http://localhost:3000/complementos/${id}/${acao}`;
    const confirmacao = confirm(`Deseja realmente ${acao} esta solicitação?`);
    if (!confirmacao) return;

    try {
      const res = await fetch(rota, { method: "PUT" });
      if (!res.ok) throw new Error();
      await carregarSolicitacoes();
    } catch {
      console.error("Erro ao atualizar status.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  useEffect(() => {
    carregarSolicitacoes();
    const interval = setInterval(carregarSolicitacoes, 10000); // auto-refresh a cada 10s
    return () => clearInterval(interval);
  }, []);

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

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto py-4">
        {carregando ? (
          <p className="text-center text-gray-600">Carregando...</p>
        ) : solicitacoes.length === 0 ? (
          <p className="text-center text-lg text-gray-700">
            Aguardando Novas Solicitações...
          </p>
        ) : (
          solicitacoes.map((item) => (
            <SolicitacaoCard
              key={item.id}
              complemento={item}
              onAceitar={(id) => atualizarStatus(id, "aceitar")}
              onRejeitar={(id) => atualizarStatus(id, "rejeitar")}
            />
          ))
        )}
      </div>

      {/* Rodapé */}
      <div className="absolute bottom-4 right-4 text-sm font-bold text-blue-800">
        EASY <span className="text-blue-400">BALANCE</span>
      </div>
    </div>
  );
}
