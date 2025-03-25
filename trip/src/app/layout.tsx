"use client";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/"; // Check if it's the home page

  return (
    <html lang="en">
      <head>
        <title>Tripsy</title>
      </head>
      <body className={`${inter.className} `}>
        <div className="whole">
        {/* Navbar */}
        
        <header className="navbar">
          <nav className="navbar-container">
            
          <div className="navbar-left">
              <Link href="/components/services">Services</Link>
              <Link href="/components/contactus">Contact Us</Link>
              <Link href="/components/OurBlogs">Our Blogs</Link>
            </div>
            <div className="navbar-right">
              <Link href="/components/login">Login</Link>
              <Link href="/components/signup">Signup</Link>
            </div>
          </nav>
        </header>
        {isHomePage && <div className="home-background"></div>}

        {/* Page Content */}

        <main className="content">
          {children}

          {/* Only show slide2 on home page */}
          {isHomePage && (
            <div className="slide2">
              <div className="elephant"></div>
              <div className="right-signup"></div>
            </div>
          )}
        </main>
        </div>
        {/* Footer */}
        <footer className="footer">
          <p>© 2025 My Website</p>
        </footer>
      </body>
    </html>
  );
}
