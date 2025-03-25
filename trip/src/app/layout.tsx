"use client";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <html lang="en">
      <head>
        <title>Tripsy</title>
      </head>
      <body className={`${inter.className}`}>
        {/* Navbar */}
        <div className="home-background"></div>
        <header className="navbar">
          <nav className="navbar-container">
            <div className="navbar-left">
              <Link href="/components/services">Services</Link>
              <Link href="/components/contactus">Contact Us</Link>
              <Link href="/components/OurBlogs">Our Blogs</Link>
            </div>
            <div className="navbar-right">
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
            </div>
          </nav>
        </header>

        {/* Page Content */}
        <main className="content">{children}</main>

        {/* Footer */}
        <footer className="footer">
          <p>© 2025 My Website</p>
        </footer>
      </body>
    </html>
  );
}

