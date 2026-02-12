// app/layout.js
import './globals.css';

export const metadata = {
  title: 'VideoGraph AI Support',
  description: 'AI-powered support chat for VideoGraph',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}