export async function POST(req) {
  const { message } = await req.json();

  const response = await fetch(
    "https://api.openai.com/v1/workflows/wf_69846c1c7e6c8190b645c0cfc9042f76092a/run",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        input: message,
      }),
    }
  );

  const data = await response.json();

  return Response.json({
    reply: data?.output || "No response",
  });
}
