"use client";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>Tripsy</h1>
        </header>
        <main>{children}</main> {/* This renders the page.tsx content */}
        <footer>
          <p>© 2025 My Website</p>
        </footer> 
      </body>
    </html>
  );
}
