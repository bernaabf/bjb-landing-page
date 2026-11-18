import type { Metadata } from "next";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "BJB Growth — Soluções Digitais Integradas para PMEs",
  description:
    "Desenvolvemos e integramos landing pages, automação de atendimento, inteligência artificial sob revisão, integrações e dashboards para organizar a operação de pequenas e médias empresas.",
  openGraph: {
    title: "BJB Growth — Build · Join · Business",
    description:
      "Engenharia digital e integração de processos para atendimento, operação e gestão de PMEs.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-[#2A211B] text-[#EEE7D8] antialiased selection:bg-[#D9A566] selection:text-[#2A211B]">
        {children}
      </body>
    </html>
  );
}
