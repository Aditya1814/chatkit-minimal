"use client";
import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

 const sendMessage = async () => {
  if (!message.trim()) return;

  const userMsg = { role: "user", text: message };
  setChat((prev) => [...prev, userMsg]);
  setMessage("");

  const res = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let botText = "";
  let botIndex;

  // add empty bot message first
  setChat((prev) => {
    botIndex = prev.length;
    return [...prev, { role: "bot", text: "" }];
  });

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    botText += chunk;

    // update last bot message live
    setChat((prev) => {
      const updated = [...prev];
      updated[botIndex] = { role: "bot", text: botText };
      return updated;
    });
  }
};


  return (
    <div style={{ padding: 20 }}>
      <h2>Gemini Chat</h2>

      <div style={{ minHeight: 300, border: "1px solid #ccc", padding: 10 }}>
        {chat.map((m, i) => (
          <div key={i}>
            <b>{m.role === "user" ? "You" : "Gemini"}:</b> {m.text}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        style={{ width: "80%", padding: 10 }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
