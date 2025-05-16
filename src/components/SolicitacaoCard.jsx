export default function SolicitacaoCard({
  complemento,
  onAceitar,
  onRejeitar,
}) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4 w-full max-w-md mx-auto">
      {/* Cabeçalho */}
      <h2 className="text-center text-red-600 font-semibold border-b pb-1 mb-2">
        Balança {complemento.balanca}
      </h2>

      {/* Informações */}
      <div className="space-y-1 text-sm text-gray-800">
        <div>Tara: {complemento.tara}</div>
        <div>Líquido: {complemento.liquido}</div>
        <div>Bruto: {complemento.bruto_antes}</div>
        <div>Data da Solicitação: {complemento.data}</div>
        <div>Hora da Solicitação: {complemento.hora_solicitacao}</div>
      </div>

      {/* Ações */}
      <div className="flex justify-around mt-4">
        <button
          onClick={() => onAceitar(complemento.id)}
          className="bg-green-600 text-white font-semibold px-4 py-1 rounded hover:bg-green-700"
        >
          Aceitar
        </button>
        <button
          onClick={() => onRejeitar(complemento.id)}
          className="bg-red-600 text-white font-semibold px-4 py-1 rounded hover:bg-red-700"
        >
          Rejeitar
        </button>
      </div>
    </div>
  );
}
