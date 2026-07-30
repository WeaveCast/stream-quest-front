import type { Metadata } from "next";
import {
  Cinzel_Decorative,
  Cinzel,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { Provider } from "./provider";
import { Toaster } from "sonner";
import "./globals.css";

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  weight: ["700", "900"],
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StreamQuest",
  description: "A real-time TTRPG event engine driven by Twitch viewers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzelDecorative.variable} ${cinzel.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-bg-primary text-text-primary">
        <Provider>{children}</Provider>
        <Toaster richColors position="bottom-left" />
      </body>
    </html>
  );
}
