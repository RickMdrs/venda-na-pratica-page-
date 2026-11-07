/* ============================================================
   CONFIG CENTRAL — Vendas na Prática
   Edite só este arquivo para trocar número, links, pixels e conteúdo.
   (Usa window.CONFIG em vez de `export` para a página abrir
   direto do disco, sem servidor.)
   ============================================================ */
window.CONFIG = {
  // {{WHATSAPP_NUMERO_COM_DDI}} — só números, ex: "5598999999999".
  // Vazio = o WhatsApp abre pedindo para escolher o contato (use só em teste).
  whatsapp: "5598991564356", // (98) 9 9156-4356

  // {{LINK_TIKTOK}} / {{LINK_INSTAGRAM}} — vazio esconde o ícone no rodapé.
  tiktok: "",
  instagram: "",

  // {{LEAD_WEBHOOK_URL}} — opcional (ex: Apps Script do Google Sheets).
  // Vazio = pula. Recebe POST JSON com nome, onde_vende, travamento e UTMs.
  leadWebhookUrl: "",

  // Prova social: deixe false até ter prints/vídeos reais (seção 4.9).
  showTestimonials: false,

  // Pixels — vazio = não carrega o script.
  metaPixelId: "",   // {{META_PIXEL_ID}}
  ga4Id: "",         // {{GA4_ID}}  ex: "G-XXXXXXX"
  tiktokPixelId: "", // {{TIKTOK_PIXEL_ID}}

  // Logo oficial: quando tiver, coloque "assets/logo.svg". Vazio = logo recriado em HTML/SVG.
  logoSrc: "",

  // {{CREDITO_DEV}} — "" esconde a linha.
  creditoDev: "Skye Solutions",

  /* ---------- Teste A/B do H1 do hero ----------
     Variante ativa: "a" (copy original do briefing), "b" ou "c".
     Também dá pra forçar pela URL: ?h=b                                */
  heroVariant: "a",
  heroVariants: {
    a: 'VOCÊ JÁ SABE VENDER NO PÁTIO.<br><span class="h-strong">AGORA VAI APRENDER A VENDER NO <em class="kw">DIGITAL</em>.</span>',
    b: 'VOCÊ JÁ FECHA VENDA CARA A CARA.<br><span class="h-strong">FALTA FECHAR PELO <em class="kw">CELULAR</em>.</span>',
    c: 'SEU CLIENTE ESCOLHE O VENDEDOR PELO CELULAR.<br><span class="h-strong">APRENDA A SER O <em class="kw">ESCOLHIDO</em>.</span>'
  },

  /* ---------- 4.8 O que você recebe ----------
     ⚠️ Depende do formato final (mentoria / curso / grupo / consultoria).
     tag = {{Módulo/encontro N}} — troque "Módulo" por "Encontro" se for o caso.
     enabled:false esconde o item.                                        */
  entregaveis: [
    { tag: "Módulo 1", titulo: "Perdendo o medo da câmera", enabled: true },
    { tag: "Módulo 2", titulo: "O que postar pra atrair comprador (e não curioso)", enabled: true },
    { tag: "Módulo 3", titulo: "Scripts de WhatsApp: da primeira mensagem ao agendamento", enabled: true },
    { tag: "Módulo 4", titulo: "Quebrando objeções por mensagem", enabled: true },
    { tag: "Módulo 5", titulo: "Fechamento: levando a venda até o contrato", enabled: true },
    // {{Bônus}} — {{ex.: análise do seu perfil / grupo de vendedores}}
    { tag: "Bônus", titulo: "", enabled: false }
  ],

  /* ---------- 4.9 Depoimentos (só aparecem com showTestimonials: true) ----------
     { img: "assets/depo-1.webp", nome: "Nome", local: "Cidade · Loja" }            */
  depoimentos: [],

  /* Alternativa enquanto não há depoimentos: links dos melhores vídeos do TikTok.
     { url: "https://www.tiktok.com/@.../video/...", titulo: "Como eu respondo 'tá caro'" } */
  tiktokVideos: []
};
