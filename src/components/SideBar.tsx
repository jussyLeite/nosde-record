export default function Sidebar() {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Navegação Topo */}
      <div className="bg-[#121212] rounded-lg p-5 flex flex-col gap-4 font-bold text-[#b3b3b3]">
        <div className="flex items-center gap-5 text-white cursor-pointer hover:text-white transition-colors">
          <span className="text-xl">🏠</span> Início
        </div>
        <div className="flex items-center gap-5 cursor-pointer hover:text-white transition-colors">
          <span className="text-xl">🔍</span> Procurar
        </div>
      </div>

      {/* Seção Biblioteca */}
      <div className="flex-1 bg-[#121212] rounded-lg p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between text-[#b3b3b3] px-2 font-bold">
          <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
            <span>📚</span> A tua Biblioteca
          </div>
          <button className="text-xl hover:bg-[#1f1f1f] p-1 rounded-full w-8 h-8 flex items-center justify-center text-white transition-colors">
            +
          </button>
        </div>

        {/* Card: Criar Playlist */}
        <div className="bg-[#242424] p-4 rounded-lg flex flex-col gap-3">
          <p className="font-bold text-sm text-white">Cria a tua primeira playlist</p>
          <p className="text-xs text-[#b3b3b3]">É fácil, nós ajudamos</p>
          <button className="bg-white text-black font-bold text-xs py-2 px-4 rounded-full w-max hover:scale-105 transition-transform">
            Criar playlist
          </button>
        </div>

        {/* Card: Procurar Podcasts */}
        <div className="bg-[#242424] p-4 rounded-lg flex flex-col gap-3">
          <p className="font-bold text-sm text-white">Vamos lá encontrar alguns podcasts para seguires</p>
          <p className="text-xs text-[#b3b3b3]">Vamos atualizar-te sobre os novos episódios</p>
          <button className="bg-white text-black font-bold text-xs py-2 px-4 rounded-full w-max hover:scale-105 transition-transform">
            Procurar podcasts
          </button>
        </div>
      </div>
    </div>
  );
}