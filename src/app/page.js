// app/page.js
import ChatComponent from "../../components/chatcomponent";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <ChatComponent />
    </main>
  );
}