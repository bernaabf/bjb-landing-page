import { NextResponse } from "next/server";
import {
  buildDiagnosticResult,
  validateContactInput,
  type ContactInput,
} from "@/lib/whatsapp";

export async function POST(request: Request) {
  let body: ContactInput;
  try {
    body = (await request.json()) as ContactInput;
  } catch {
    return NextResponse.json(
      { error: "Não foi possível ler os dados enviados. Tente novamente." },
      { status: 400 }
    );
  }

  const validation = validateContactInput(body);
  if (!validation.ok) {
    return NextResponse.json(
      {
        error: "Revise os campos destacados antes de continuar para o WhatsApp.",
        fieldErrors: validation.fieldErrors,
      },
      { status: 422 }
    );
  }

  return NextResponse.json(buildDiagnosticResult(validation.data), { status: 201 });
}
