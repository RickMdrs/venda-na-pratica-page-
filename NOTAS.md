# Vendas na Prática — notas de implementação

## Estrutura
```
index.html            página
privacidade.html      LGPD básica (/privacidade com cleanUrls na Vercel)
assets/js/config.js   TUDO que muda: WhatsApp, redes, pixels, webhook, H1 A/B, itens 4.8, depoimentos
assets/js/main.js     modal, form → wa.me, UTMs, tracking, FAQ, reveal, botão flutuante
assets/css/styles.css tokens da seção 2 + layout
vercel.json           cleanUrls
```
Deploy: subir a pasta na Vercel/Netlify (sem build).
Fotos: salvar `assets/celina-hero.webp` e `assets/celina-sobre.webp` (4:5). O placeholder some sozinho.
Logo oficial: `assets/logo.svg` + `logoSrc: "assets/logo.svg"` no config.
OG: `assets/og-image.jpg` 1200×630.

## Teste A/B do H1 (copywriting + marketing-psychology)
Ativar em `heroVariant` no config ou pela URL `?h=b`. O GA4 recebe `hero_variant`.
- **A (controle, briefing):** VOCÊ JÁ SABE VENDER NO PÁTIO. AGORA VAI APRENDER A VENDER NO DIGITAL.
- **B:** VOCÊ JÁ FECHA VENDA CARA A CARA. FALTA FECHAR PELO CELULAR.
  Puxa o "fechar" (resultado), mais curto e concreto que "digital".
- **C:** SEU CLIENTE ESCOLHE O VENDEDOR PELO CELULAR. APRENDA A SER O ESCOLHIDO.
  Usa o argumento da 4.4 (o cliente escolhe antes de pisar na loja) com aversão à perda: outro vendedor está sendo escolhido.

## Auditoria CRO (só sugestões, nada aplicado na copy)
**Ganhos rápidos**
1. Quando houver 1 print real de cliente/venda vindo do TikTok, colocar logo abaixo da faixa de prova. Hoje a prova é só autoridade, sem resultado de terceiro.
2. Hero no mobile: o CTA aparece na primeira tela em 360px. Manter assim ao trocar a foto (não deixar a foto subir acima do texto).
3. Adicionado CTA secundário "Quero começar" após a 4.8, para manter "1 CTA a cada ~2 seções" (4.6–4.8 ficavam sem botão).

**Teste depois**
- Selects → chips (botões de opção) no form: 4–5 opções cabem em toque único no celular e costumam completar mais rápido. Mantive select porque o briefing pede.
- Microcopy do hero com tempo de resposta real ("respondo no mesmo dia"), se for verdade.

## Form (cro/form)
- 3 campos, labels visíveis, erro inline em pt-BR, foco vai pro primeiro erro, nada é apagado.
- Teclado mobile: `autocapitalize=words`, campos com 52px de altura, botão com 56px.
- Linha de confiança abaixo do botão (privacidade) + link de escape.
- No celular o sheet abre sem focar o input (evita teclado cobrindo tudo). No desktop foca o nome.
- Mensagem: `onde_vende` vira frase natural ("vendo em concessionária"), travamento em minúscula.

## Tracking (analytics + conversion-tracking)
| Evento | Onde | Quando |
|---|---|---|
| GA4 `cta_click` {section} | todos os botões `data-cta` + links diretos (`direto_modal`, `direto_footer`) | clique |
| GA4 `form_open` {section} | modal | abertura |
| GA4 `form_submit` {onde_vende, travamento} | form | envio válido, antes do redirect |
| Meta `Lead` | form | envio válido |
| Meta `Contact` | link direto | clique |
| TikTok `SubmitForm` | form | envio válido |
Sections: header, hero, metodo, recebe, final, flutuante.
GA4 usa `transport_type: beacon` pra não perder evento no redirect.
UTMs ficam na sessionStorage (sobrevivem à navegação) e entram como `(origem: utm_source)`.
**Verificar:** Meta Events Manager → Test Events / TikTok Pixel Helper / GA4 DebugView, com um envio real.

## Checklist antes de publicar
- [ ] `whatsapp` no config, testado no celular (abre o app com a mensagem certa)
- [ ] Formato do produto + itens 4.8 (e o Bônus: `enabled: true` + título)
- [ ] História "também travei" (4.6) validada pela Celina — alternativa está no comentário do HTML
- [ ] Fotos reais + og-image
- [ ] Logo SVG oficial
- [ ] Links TikTok / Instagram
- [ ] Pixels + eventos disparando
- [ ] Android + iPhone (incluindo abrir pelo navegador interno do TikTok/Instagram)
