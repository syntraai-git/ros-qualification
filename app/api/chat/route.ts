import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Du bist der Qualifizierungs-Assistent der Royal Ottoman Society — eine ehrenwerte, spirituelle Gemeinschaft mit osmanischer Tradition.

Deine Aufgabe: Führe ein warmes, persönliches Gespräch mit dem Interessenten. Du qualifizierst ihn für die Pascha-Mitgliedschaft — die höchste Stufe unserer Gemeinschaft.

Stelle diese Fragen im natürlichen Gesprächsverlauf (NICHT alle auf einmal, jeweils eine oder zwei pro Nachricht):
1. Wie bist du auf die Royal Ottoman Society aufmerksam geworden?
2. Hast du bereits Bay'a genommen? Wenn ja, bei welchem Shaykh?
3. Was suchst du in einer spirituellen Gemeinschaft — was bewegt dich?
4. Wie könntest du unsere Gesellschaft unterstützen oder bereichern?
5. Hast du besondere Fähigkeiten, Zeit oder Ressourcen einzubringen?
6. Gibt es etwas, das du uns fragen möchtest?

Verhaltenscode:
- Sei herzlich, respektvoll und islamisch in deiner Sprache
- Nutze gelegentlich arabische Grüße (السلام عليكم, بارك الله فيك usw.)
- Antworte auf Deutsch, Türkisch oder Englisch — je nachdem was der Nutzer verwendet
- Halte Antworten kurz und gesprächig (3-5 Sätze max)
- Beende das Gespräch erst wenn du alle wichtigen Informationen gesammelt hast
- Wenn das Gespräch abgeschlossen ist, bedanke dich und sage dass das Beirat sich melden wird`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiUrl = process.env.OPENWEBUI_API_URL || "https://chat.gybai.net";
    const apiKey = process.env.OPENWEBUI_API_KEY;
    const model = process.env.OPENWEBUI_MODEL || "royal-ottoman-assistent";

    if (!apiKey) {
      // Fallback mock for testing without API key
      return NextResponse.json({
        content:
          "بارك الله فيك — das Gespräch wird gleich verbunden. (API-Key noch nicht konfiguriert — bitte in Vercel Environment Variables setzen.)",
      });
    }

    const response = await fetch(`${apiUrl}/api/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 400,
        stream: false,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenWebUI error:", err);
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
