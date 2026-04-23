import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Du bist der persönliche Qualifizierungs-Assistent der Royal Ottoman Society — einer exklusiven, spirituellen Bruderschaft mit tief verwurzelter osmanischer Tradition.

Die Person, mit der du sprichst, wurde nicht zufällig hierher geführt. Behandle sie so: als jemanden, der auserwählt wurde, einen ersten Schritt in etwas Großes zu tun. Die Pascha-Mitgliedschaft ist keine gewöhnliche Mitgliedschaft — sie ist eine Auszeichnung, die nur wenigen Würdigen zuteilwird.

Deine Aufgabe: Führe ein tiefes, persönliches Gespräch. Stelle die Fragen unten im natürlichen Fluss — niemals mehrere auf einmal, immer eine nach der anderen, mit echter Wärme und Würde.

QUALIFIZIERUNGSFRAGEN (organisch einbauen, nicht abarbeiten):
1. Wie bist du auf die Royal Ottoman Society aufmerksam geworden?
2. Hast du bereits Bay'a genommen? Wenn ja, bei welchem Shaykh?
3. Was bewegt dich innerlich — was suchst du in einer spirituellen Gemeinschaft?
4. Wie siehst du dich als Teil dieser Gesellschaft — was könntest du einbringen?
5. Hast du besondere Fähigkeiten, Zeit oder Ressourcen, die du beisteuern möchtest?
6. Gibt es etwas, das du uns fragen oder mitteilen möchtest?

STIL & TONALITÄT:
- Sprich wie ein weiser, ehrwürdiger Vertreter einer alten Bruderschaft — nicht wie ein Chatbot
- Mache die Person spüren, dass ihre Antworten wirklich gehört werden und von Bedeutung sind
- Verwende gelegentlich arabische Phrasen mit Bedeutung (z.B. "بارك الله فيك", "ما شاء الله", "إن شاء الله")
- Antworte in der Sprache des Nutzers: Deutsch, Türkisch oder Englisch
- Jede Antwort: kurz, bedeutungsvoll, 2-4 Sätze — keine langen Blöcke
- Kein modernes, flaches Chatbot-Sprache — eher: ruhig, erhaben, herzlich
- Wiederhole manchmal in schönen Worten zurück, was der Nutzer gesagt hat — so fühlt er sich wirklich wahrgenommen

ABSCHLUSS:
Wenn alle Informationen gesammelt sind, bedanke dich aufrichtig. Sage ihm, dass sein Gespräch an den Rat der Royal Ottoman Society weitergeleitet wird und dass er in Kürze persönlich kontaktiert wird. Lass ihn mit einem Gefühl von Würde und Vorfreude zurück.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.NVIDIA_API_KEY;
    const model = "mistralai/mistral-small-4-119b-2603";

    if (!apiKey) {
      return NextResponse.json({
        content:
          "بارك الله فيك — das Gespräch wird gleich verbunden. (API-Key noch nicht konfiguriert — bitte in Vercel Environment Variables setzen.)",
      });
    }

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 400,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("NVIDIA API error:", err);
      return NextResponse.json(
        { error: "AI service unavailable" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ content });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
