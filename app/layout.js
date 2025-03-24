import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react"
import Navbar from "../components/Navbar";
import { fetchPopularMovies } from "../lib/tmdb";
import "./globals.css";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

export const metadata = {
  title: "Movie Box",
  description: "MovieBox is made with tmdb",
};

export default async function RootLayout({ children }) {
  let popularMovies = [];
  let error = null;

  try {
    popularMovies = await fetchPopularMovies();
  } catch (err) {
    error = err.message; 
  }

  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading />}>
          <Navbar popularMovies={popularMovies} error={error} />
          <main>{children}</main>
          <Footer />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}