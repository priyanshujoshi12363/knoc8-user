import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

const display = Baloo_2({ subsets: ["latin"], weight: ["600", "800"], variable: "--font-display" });
const body = Nunito({ subsets: ["latin"], weight: ["400", "600", "800"], variable: "--font-body" });

export const metadata = {
  title: "Knoc8 – the little robot that runs your PC",
  description: "Hold a button, say what you need, and Knoc8 does it on your Windows PC. Coming soon.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}