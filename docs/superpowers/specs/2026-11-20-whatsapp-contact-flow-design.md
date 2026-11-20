# Especificação — Fluxo de Contato Direto via WhatsApp (`#diagnostico`)

**Data:** 2026-11-20  
**Branch / Escopo:** `feat/whatsapp-contact`  
**Destino WhatsApp:** `+5581982240109` (`https://wa.me/5581982240109?text=...`)

---

## 1. Intenção e Contexto
Transformar a seção de contato/diagnóstico (`#diagnostico`) da Landing Page da BJB Growth em uma ponte direta e de baixo atrito para o WhatsApp dos desenvolvedores (`+5581982240109`). O visitante informa apenas o essencial no site para que a equipe receba a mensagem já estruturada e aprofunde as dores e requisitos técnicos diretamente na conversa.

## 2. Objetivos, Não-Objetivos e Restrições
- **Objetivos:**
  1. Reduzir o formulário de contato para **somente 3 campos obrigatórios**:
     - `nome` (*Seu nome*, mín. 2 caracteres após `trim`)
     - `produtos` (*Qual tipo de produto você busca?*, seleção múltipla em chips usando os 5 produtos de `SERVICES`: `landing-sistemas`, `automacao`, `inteligencia-artificial`, `integracoes`, `dashboards`; mín. 1 selecionado)
     - `objetivo` (*Qual o seu objetivo?*, mín. 5 caracteres após `trim`)
  2. Construir deterministicamente a mensagem pré-digitada começando com `"Olá BJB!"` e a URL `https://wa.me/5581982240109?text=...`.
  3. Ao submeter o formulário válido (**Alternativa A**):
     - Abrir imediatamente a conversa no WhatsApp em nova aba (`window.open(whatsappUrl, "_blank", "noopener,noreferrer")`) dentro do handler do evento para evitar bloqueio de pop-up.
     - Registrar o pedido via `POST /api/diagnostico` (com fallback local caso a API esteja indisponível, garantindo que o usuário nunca perca o acesso ao link).
     - Exibir o painel de confirmação com botão primário de ação direta (**"Saiba mais no WhatsApp"**), botão secundário (**"Copiar mensagem"**) e botão para voltar (**"Editar informações"**).
  4. Utilizar no botão principal de submissão do formulário o texto **"Entenda a melhor proposta para você"**.
- **Não-Objetivos:**
  - Não coletar campos de empresa, segmento, contato secundário ou gargalos operacionais no formulário.
  - Não alterar nenhuma outra seção da Landing Page além de `#diagnostico` e da rota `/api/diagnostico`.
- **Restrições:**
  - Preservar identidade visual, tokens de cor, tipografia, acessibilidade e coreografia GSAP da BJB Growth.
  - Sem dependências externas adicionais para geração de links ou testes.

## 3. Abordagens Consideradas
- **Alternativa A (Escolhida):** Validação no cliente + abertura imediata do WhatsApp ao submeter + registro em `POST /api/diagnostico` + card de confirmação com link direto de segurança (`"Saiba mais no WhatsApp"`) e cópia da mensagem.
- **Alternativa B (Descartada):** Exigir dois cliques (gerar card primeiro para só então oferecer o botão do WhatsApp), adicionando fricção desnecessária.
- **Alternativa C (Descartada):** Apenas redirecionar sem estado de confirmação na página, prejudicando usuários caso o navegador bloqueie pop-ups ou precisem editar/copiar o texto.

## 4. Contrato da Mensagem Pré-digitada
```text
Olá BJB! Vim pelo site e gostaria de falar com os desenvolvedores.

*Nome:* {nome}
*Produto(s) de interesse:* {produtos separados por ", "}
*Objetivo:* {objetivo}
```

## 5. Decisões do Builder
- `src/lib/whatsapp.ts` concentra `WHATSAPP_PHONE`, `PRODUCT_OPTIONS`, `PRODUCT_LABELS`, `validateContactInput`, `buildWhatsAppMessage` e `buildWhatsAppUrl` sem imports relativos externos, permitindo execução direta tanto pelo Next.js quanto pelo runner nativo `node --test`.
