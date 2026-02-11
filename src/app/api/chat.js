import OpenAI from "openai";

export const runtime = "edge";

export async function POST(req) {
  try {
    const { message, session } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: message,
      metadata: {
        session,
      },
    });

    const text =
      response.output?.[0]?.content?.[0]?.text || "No response";

    return Response.json({ answer: text });
  } catch (err) {
    console.error(err);
    return Response.json({ answer: "Error" }, { status: 500 });
  }
}
