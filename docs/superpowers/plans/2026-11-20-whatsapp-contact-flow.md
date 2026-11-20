# WhatsApp Direct Contact Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Direcionar o formulário da seção `#diagnostico` para o WhatsApp `+5581982240109` com mensagem pré-digitada contendo apenas os 3 campos obrigatórios (nome, tipo de produto e objetivo), abertura imediata no envio e CTAs com copy orientada à proposta.

**Architecture:** Um módulo puro `src/lib/whatsapp.ts` centraliza a lista de produtos, validação de entrada, formatação da mensagem (`"Olá BJB!..."`) e construção da URL `wa.me`. A rota `src/app/api/diagnostico/route.ts` e o componente cliente `ConversionSection` em `src/components/ValueAndConversionSection.tsx` compartilham esse mesmo contrato validado por testes unitários via `node:test`.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript 5.8, Tailwind CSS v4, GSAP, Node.js native test runner (`node:test`).

**Spec:** `docs/superpowers/specs/2026-11-20-whatsapp-contact-flow-design.md`

## Global Constraints
- Número de destino fixo: `+5581982240109` (`WHATSAPP_PHONE = "5581982240109"`).
- Somente 3 campos obrigatórios: `nome` (mín. 2 chars), `produtos` (mín. 1 ID válido de `SERVICES`), `objetivo` (mín. 5 chars).
- Saudação inicial exata da mensagem: `"Olá BJB! Vim pelo site e gostaria de falar com os desenvolvedores."`.
- Copy dos botões: submit `"Entenda a melhor proposta para você"`; ação direta no card `"Saiba mais no WhatsApp"`.
- Preservar `ValueSection` e todas as demais seções da Landing Page sem alterações.

## Review Focus
- Bloqueador de pop-up do navegador: `window.open` precisa ser disparado síncronamente no `handleSubmit` antes do `await fetch`, e o card pós-envio deve manter `<a href={result.whatsappUrl}>`.
- Falha ou lentidão da API `/api/diagnostico`: fallback local na UI garante que o card de confirmação e o link do WhatsApp fiquem disponíveis mesmo offline.
- IDs inválidos ou duplicados em `produtos`: `validateContactInput` filtra IDs desconhecidos e deduplica antes de montar os rótulos.
- Caracteres especiais e quebras de linha em `nome` e `objetivo`: `encodeURIComponent` preserva acentos, asteriscos e quebras de linha na URL `wa.me`.
- Acessibilidade e validação: mensagens de erro por campo (`aria-invalid`) e botões de seleção com `aria-pressed`.

---

### Task 1: Módulo puro de validação e geração de link WhatsApp (`src/lib/whatsapp.ts`)

**Files:**
- Create: `src/lib/whatsapp.ts`
- Test: `tests/whatsapp.test.ts`

**Interfaces:**
- Produces: `WHATSAPP_PHONE`, `PRODUCT_OPTIONS`, `PRODUCT_LABELS`, `validateContactInput`, `buildWhatsAppMessage`, `buildWhatsAppUrl`

- [ ] **Step 1: Write the failing tests in `tests/whatsapp.test.ts`**
- [ ] **Step 2: Run `npm test` to verify RED (fails because `src/lib/whatsapp.ts` does not exist)**
- [ ] **Step 3: Implement `src/lib/whatsapp.ts` with minimal code to pass all assertions**
- [ ] **Step 4: Run `npm test` to verify GREEN**
- [ ] **Step 5: Commit `src/lib/whatsapp.ts` and `tests/whatsapp.test.ts`**

### Task 2: Atualizar rota `POST /api/diagnostico` (`src/app/api/diagnostico/route.ts`)

**Files:**
- Modify: `src/app/api/diagnostico/route.ts`
- Test: `tests/diagnostico-route.test.ts` (or extend `tests/whatsapp.test.ts`)

**Interfaces:**
- Consumes: `validateContactInput`, `buildWhatsAppMessage`, `buildWhatsAppUrl` from `@/lib/whatsapp`
- Produces: JSON response `{ ok, protocolo, recebidoEm, whatsappUrl, mensagem, resumo: { nome, produtos, objetivo, proximoPasso } }`

- [ ] **Step 1: Write failing test for API payload helper / route behavior**
- [ ] **Step 2: Run `npm test` to verify RED**
- [ ] **Step 3: Update `src/app/api/diagnostico/route.ts` to use `validateContactInput`, `buildWhatsAppMessage`, `buildWhatsAppUrl`**
- [ ] **Step 4: Run `npm test` to verify GREEN**
- [ ] **Step 5: Commit `src/app/api/diagnostico/route.ts` and tests**

### Task 3: Atualizar `ConversionSection` (`src/components/ValueAndConversionSection.tsx`)

**Files:**
- Modify: `src/components/ValueAndConversionSection.tsx:204-791`

**Interfaces:**
- Consumes: `SERVICES` from `@/data/bjb-content`, `validateContactInput`, `buildWhatsAppMessage`, `buildWhatsAppUrl` from `@/lib/whatsapp`

- [ ] **Step 1: Update `DiagnosticResponse`, state hooks (`nome`, `produtos`, `objetivo`), `toggleProduto`, and `handleSubmit` with synchronous `window.open` + API fallback**
- [ ] **Step 2: Render the 3 mandatory fields (`Seu nome`, `Qual tipo de produto você busca?`, `Qual o seu objetivo?`), submit button `"Entenda a melhor proposta para você"`, and confirmation panel with `"Saiba mais no WhatsApp"`**
- [ ] **Step 3: Run `./node_modules/.bin/tsc --noEmit`, `npm test`, and `npm run build` to verify clean build and tests**
- [ ] **Step 4: Commit `src/components/ValueAndConversionSection.tsx`**
