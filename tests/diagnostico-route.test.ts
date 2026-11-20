import assert from "node:assert/strict";
import path from "node:path";
import { describe, test } from "node:test";
import { createJiti } from "jiti";
import { SERVICES } from "../src/data/bjb-content.ts";
import { PRODUCT_OPTIONS, WHATSAPP_PHONE } from "../src/lib/whatsapp.ts";

const jiti = createJiti(import.meta.url, {
  alias: {
    "@": path.resolve(process.cwd(), "src"),
  },
});

type RouteModule = {
  POST: (request: Request) => Promise<Response>;
};

const { POST } = (await jiti.import(
  path.resolve(process.cwd(), "src/app/api/diagnostico/route.ts")
)) as RouteModule;

describe("POST /api/diagnostico route and catalog alignment", () => {
  test("PRODUCT_OPTIONS stays aligned with SERVICES in bjb-content.ts", () => {
    assert.deepEqual(
      PRODUCT_OPTIONS.map((p) => ({ id: p.id, title: p.title, tag: p.tag })),
      SERVICES.map((s) => ({ id: s.id, title: s.title, tag: s.tag }))
    );
  });

  test("returns 400 when request body is malformed JSON", async () => {
    const req = new Request("http://localhost/api/diagnostico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{invalid-json",
    });

    const res = await POST(req);
    assert.equal(res.status, 400);
    const body = (await res.json()) as { error?: string };
    assert.ok(body.error);
  });

  test("returns 422 with fieldErrors for missing or invalid mandatory fields", async () => {
    const req = new Request("http://localhost/api/diagnostico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: "J",
        produtos: [],
        objetivo: "abc",
      }),
    });

    const res = await POST(req);
    assert.equal(res.status, 422);
    const body = (await res.json()) as {
      error?: string;
      fieldErrors?: Record<string, string>;
    };
    assert.ok(body.error);
    assert.ok(body.fieldErrors?.nome);
    assert.ok(body.fieldErrors?.produtos);
    assert.ok(body.fieldErrors?.objetivo);
  });

  test("returns 201 with WhatsApp URL, 'Olá BJB!' message, and summary for valid payload", async () => {
    const req = new Request("http://localhost/api/diagnostico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: "  Mariana Alves  ",
        produtos: ["landing-sistemas", "automacao"],
        objetivo: "  Criar site e automatizar atendimento inicial no WhatsApp.  ",
      }),
    });

    const res = await POST(req);
    assert.equal(res.status, 201);
    const body = (await res.json()) as {
      ok: boolean;
      protocolo: string;
      recebidoEm: string;
      whatsappUrl: string;
      mensagem: string;
      resumo: {
        nome: string;
        produtos: string[];
        objetivo: string;
        proximoPasso: string;
      };
    };

    assert.equal(body.ok, true);
    assert.match(body.protocolo, /^BJB-[A-Z0-9]+$/);
    assert.ok(!Number.isNaN(Date.parse(body.recebidoEm)));
    assert.ok(body.whatsappUrl.startsWith(`https://wa.me/${WHATSAPP_PHONE}?text=`));
    assert.ok(
      body.mensagem.startsWith(
        "Olá BJB! Vim pelo site e gostaria de falar com os desenvolvedores."
      )
    );
    assert.equal(
      decodeURIComponent(body.whatsappUrl.split("?text=")[1] ?? ""),
      body.mensagem
    );
    assert.deepEqual(body.resumo, {
      nome: "Mariana Alves",
      produtos: ["Landing pages e sistemas digitais", "Automação de atendimento"],
      objetivo: "Criar site e automatizar atendimento inicial no WhatsApp.",
      proximoPasso:
        "Conversa iniciada no WhatsApp com os desenvolvedores para entender suas dores e desenhar a melhor proposta.",
    });
  });
});
