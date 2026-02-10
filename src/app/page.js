"use client";

import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg.text }),
    });

    const data = await res.json();

    let answer = "No answer";
    let sources = [];

    try {
      const parsedOuter = data.reply;
      const parsedInner =
        typeof parsedOuter === "string" ? JSON.parse(parsedOuter) : parsedOuter;

      answer = parsedInner.answer || "No answer";
      sources = parsedInner.source_documents || [];
    } catch (e) {
      console.error("JSON parse error:", e);
      answer = data.reply;
    }

    setMessages((m) => [
      ...m,
      {
        role: "agent",
        answer,
        sources,
      },
    ]);

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Arial" }}>
      <h2>Agent Chat</h2>

      <div style={{ border: "1px solid #ddd", padding: 12, minHeight: 300 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            {m.role === "user" ? (
              <div>
                <b>You:</b> {m.text}
              </div>
            ) : (
              <div>
                <div>
                  <b>Answer:</b>
                  <div style={{ marginTop: 5 }}>{m.answer}</div>
                </div>

                {m.sources?.length > 0 && (
                  <div style={{ marginTop: 10 }}>
                    <b>Source Documents:</b>
                    <ul>
                      {m.sources.map((s, idx) => (
                        <li key={idx}>
                          <a href={s.url} target="_blank">
                            {s.title}
                          </a>{" "}
                          ({s.confidence}%)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && <div>Thinking...</div>}
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "80%", padding: 8 }}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage} style={{ padding: 8 }}>
          Send
        </button>
      </div>
    </div>
  );
}
