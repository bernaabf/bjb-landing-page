import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  PRODUCT_LABELS,
  PRODUCT_OPTIONS,
  WHATSAPP_PHONE,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  validateContactInput,
} from "../src/lib/whatsapp.ts";

describe("WhatsApp contact domain helpers", () => {
  test("uses the exact developer WhatsApp phone number +5581982240109", () => {
    assert.equal(WHATSAPP_PHONE, "5581982240109");
  });

  test("exposes the 5 BJB Growth product options matching SERVICES", () => {
    assert.deepEqual(
      PRODUCT_OPTIONS.map((item) => item.id),
      [
        "landing-sistemas",
        "automacao",
        "inteligencia-artificial",
        "integracoes",
        "dashboards",
      ]
    );
    assert.equal(PRODUCT_LABELS["landing-sistemas"], "Landing pages e sistemas digitais");
    assert.equal(PRODUCT_LABELS["automacao"], "Automação de atendimento");
    assert.equal(PRODUCT_LABELS["inteligencia-artificial"], "Inteligência artificial");
    assert.equal(PRODUCT_LABELS["integracoes"], "Integrações");
    assert.equal(PRODUCT_LABELS["dashboards"], "Dashboards");
  });

  test("validateContactInput rejects short nome, empty produtos, and short objetivo", () => {
    const result = validateContactInput({
      nome: " A ",
      produtos: [],
      objetivo: "Oi",
    });

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.ok(result.fieldErrors.nome);
      assert.ok(result.fieldErrors.produtos);
      assert.ok(result.fieldErrors.objetivo);
    }
  });

  test("validateContactInput rejects unknown-only product IDs", () => {
    const result = validateContactInput({
      nome: "Mariana Alves",
      produtos: ["produto-inexistente", 123],
      objetivo: "Quero automatizar meu atendimento no WhatsApp.",
    });

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.fieldErrors.nome, undefined);
      assert.ok(result.fieldErrors.produtos);
      assert.equal(result.fieldErrors.objetivo, undefined);
    }
  });

  test("validateContactInput trims fields, filters unknown IDs, and deduplicates products", () => {
    const result = validateContactInput({
      nome: "  Mariana Alves  ",
      produtos: ["automacao", "invalido", "automacao", "dashboards"],
      objetivo: "  Automatizar agendamentos e visualizar métricas.  ",
    });

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.deepEqual(result.data, {
        nome: "Mariana Alves",
        produtos: ["automacao", "dashboards"],
        produtosNomes: ["Automação de atendimento", "Dashboards"],
        objetivo: "Automatizar agendamentos e visualizar métricas.",
      });
    }
  });

  test("buildWhatsAppMessage starts with 'Olá BJB!' and includes nome, produtos, and objetivo", () => {
    const message = buildWhatsAppMessage({
      nome: "Carlos Silva",
      produtos: ["landing-sistemas", "integracoes"],
      produtosNomes: ["Landing pages e sistemas digitais", "Integrações"],
      objetivo: "Criar site de captação integrado ao CRM.",
    });

    assert.equal(
      message,
      [
        "Olá BJB! Vim pelo site e gostaria de falar com os desenvolvedores.",
        "",
        "*Nome:* Carlos Silva",
        "*Produto(s) de interesse:* Landing pages e sistemas digitais, Integrações",
        "*Objetivo:* Criar site de captação integrado ao CRM.",
      ].join("\n")
    );
  });

  test("buildWhatsAppUrl generates wa.me URL for +5581982240109 with safely encoded message", () => {
    const input = {
      nome: "Ana & João",
      produtos: ["inteligencia-artificial"],
      produtosNomes: ["Inteligência artificial"],
      objetivo: "Triagem 100% automática?\nSim, com revisão #1.",
    };

    const url = buildWhatsAppUrl(input);
    const expectedPrefix = "https://wa.me/5581982240109?text=";

    assert.ok(url.startsWith(expectedPrefix));
    const encodedPart = url.slice(expectedPrefix.length);
    assert.equal(decodeURIComponent(encodedPart), buildWhatsAppMessage(input));
  });
});
