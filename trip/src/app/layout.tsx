"use client";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import SearchBar from "./components/searchbar/page"; // Import the SearchBar component
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap"
    rel="stylesheet"
  />
      </head>
      <body className={`${inter.className} `}>
        <div className="whole">
          {/* Navbar */}
          <header className="navbar">
            <nav className="navbar-container">
              <div className="navbar-left">
                <Link href="/">tripsy</Link>
                <Link href="/components/services">Services</Link>
                <Link href="/components/contactus">Contact Us</Link>
                <Link href="/components/OurBlogs">Our Blogs</Link>
                <Link href="/components/OurBlogs/add">Add Article</Link>
              </div>
              <div className="navbar-right">
                <Link href="/components/login">Login</Link>
                <Link href="/components/signup">Signup</Link>
              </div>
            </nav>
          </header>

          {isHomePage && <div className="home-background"></div>}
          {isHomePage && <div className="heading">tripsy</div>}
          {isHomePage && <SearchBar />}

          {/* "View All Travels" Button */}
          {isHomePage && (
            <div className="view-all-container">
              <Link href="/components/searchbar">
                <button className="view-all-button">View All Travels</button>
              </Link>
            </div>
          )}

          <main className="content">
            {children}

            {/* Only show slide2 on home page */}
            {isHomePage && (
              <div className="slide2">
                <div className="elephant"></div>
                <div className="right-signup">
  <div className="right-signup-heading">
    From hidden gems to iconic landmarks, experience the world through the lens of top travelers and influencers!
  </div>
  <div className="right-signup-subheading">
    Share your experiences and suggestions today!
  </div>
  <Link href="/components/signup">
    <button className="signup-button">SIGN ME UP</button>
  </Link>
</div>

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
