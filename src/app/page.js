"use client";

import { ChatKit, useChatKit } from "@openai/chatkit-react";

export default function MyChat() {
  const { control } = useChatKit({
    api: {
      async getClientSecret() {
        const res = await fetch("/api/chatkit/session", {
          method: "POST",
        });

        const { client_secret } = await res.json();
        return client_secret;
      },
    },
  });

  return (
    <div style={{ height: "600px", width: "350px" }}>
      <ChatKit control={control} />
    </div>
  );
}
