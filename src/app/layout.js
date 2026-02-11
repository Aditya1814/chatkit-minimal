import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VideoGraph Agent",
  description: "Chat with VideoGraph AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
<script
  src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
  async
></script>

      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
