import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist_Mono, Instrument_Serif } from "next/font/google";
import { MotionProvider } from "@/components/motion/Providers";
import "./globals.css";

// Body copy: Inter, for reading.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Headings: Plus Jakarta Sans.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

// Numbers, meta rows, and the nav.
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// The one serif: the signature, section titles, and the closing words of headlines.
const instrument = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tanvir Ahassan | UI/UX Designer",
  description:
    "Tanvir Ahassan is a UI/UX designer with a software engineering background, creating clear, buildable web and mobile products with systems thinking and AI-assisted workflows.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
