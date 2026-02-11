import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "OpenAI-Beta": "chatkit_beta=v1",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        workflow: {
          id: "wf_69846c1c7e6c8190b645c0cfc9042f76092a5078336c5762", // YOUR WORKFLOW ID
        },
        user: crypto.randomUUID(), // unique user id
      }),
    });

    const data = await response.json();
    console.log(data,"data")

    return NextResponse.json({
      client_secret: data.client_secret,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Session failed" }, { status: 500 });
  }
}
