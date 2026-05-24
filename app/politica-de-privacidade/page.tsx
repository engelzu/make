"use client";

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] aspect-square rounded-full bg-rose-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] aspect-square rounded-full bg-pink-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl bg-stone-900/80 backdrop-blur-md border border-stone-850 rounded-3xl p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <h1 className="font-serif text-3xl font-bold tracking-tight mb-6 text-white uppercase text-center border-b border-stone-800 pb-4">
          Política de Privacidade - Estilo
        </h1>

        <div className="space-y-6 text-stone-300 text-sm leading-relaxed">
          <p>
            <strong>Última atualização:</strong> 24 de maio de 2026
          </p>

          <p>
            O desenvolvedor do aplicativo <strong>Estilo</strong> criou este app como um serviço comercial (pago por taxa única). Este serviço é fornecido no estado em que se encontra.
          </p>

          <h2 className="text-white font-serif text-lg font-semibold mt-6 mb-2">1. Coleta e Uso de Informações</h2>
          <p>
            O aplicativo <strong>Estilo não coleta, não armazena e não transmite nenhuma informação de identificação pessoal</strong> dos seus usuários. 
            Todas as suas preferências, favoritos e o controle do seu período de testes são armazenados localmente e de forma restrita no armazenamento interno do seu próprio dispositivo móvel (LocalStorage). Nenhum dado pessoal é enviado a servidores externos.
          </p>

          <h2 className="text-white font-serif text-lg font-semibold mt-6 mb-2">2. Provedores de Serviços de Terceiros</h2>
          <p>
            O aplicativo pode usar recursos e serviços de terceiros para melhorar o funcionamento local (como voz do sistema nativo para leitura dos audioguias e conexões de rede padrão para carregar imagens públicas e previsão do tempo). Links para as políticas de privacidade dos provedores de serviços externos que podem ser utilizados:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline">
                Google Play Services (Android)
              </a>
            </li>
          </ul>

          <h2 className="text-white font-serif text-lg font-semibold mt-6 mb-2">3. Logs e Erros (Log Data)</h2>
          <p>
            Informamos que, sempre que você usa o aplicativo, em caso de erro interno, o sistema operacional do seu celular (Android) pode registrar relatórios de erros técnicos automáticos (Log Data). Estes relatórios contêm dados básicos de hardware e versão do sistema operacional e servem exclusivamente para a Google Play ajudar a diagnosticar falhas, sem qualquer ligação a dados de identidade pessoal.
          </p>

          <h2 className="text-white font-serif text-lg font-semibold mt-6 mb-2">4. Segurança</h2>
          <p>
            Como todos os dados do aplicativo ficam guardados e restritos ao LocalStorage do seu próprio celular, a segurança das informações está ligada à segurança do próprio sistema operacional do seu dispositivo. Nenhuma transmissão de dados pela internet é feita pelo aplicativo para salvar seus dados.
          </p>

          <h2 className="text-white font-serif text-lg font-semibold mt-6 mb-2">5. Mudanças nesta Política de Privacidade</h2>
          <p>
            Podemos atualizar nossa Política de Privacidade de tempos em tempos. Recomendamos que você revise esta página periodicamente para quaisquer alterações. Iremos postar a nova Política de Privacidade nesta página para acesso público.
          </p>

          <h2 className="text-white font-serif text-lg font-semibold mt-6 mb-2">6. Contato</h2>
          <p>
            Se você tiver alguma dúvida ou sugestão sobre a nossa Política de Privacidade, não hesite em entrar em contato com o suporte através da loja de aplicativos.
          </p>
        </div>
      </div>
    </div>
  );
}
