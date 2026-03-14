import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ThemeToggle from "@/components/theme-toggle";
import NowPlaying from "@/components/now-playing";

export const metadata: Metadata = {
  title: "Eral Keskinkurt",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed top-4 left-8 right-5 z-50 flex items-center justify-between">
            <NowPlaying />
            <ThemeToggle />
          </div>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
