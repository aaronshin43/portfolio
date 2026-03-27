import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { NekoLoader } from "@/components/cat/NekoLoader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aaronshin.dev"),
  title: "Aaron Shin — Developer Portfolio",
  description:
    "Personal portfolio of Aaron Shin (Jeongcheol Shin), CS & Math student at Dickinson College, undergraduate researcher, and hackathon winner.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Aaron Shin — Developer Portfolio",
    description:
      "CS & Math student, undergraduate ML researcher, hackathon winner.",
    url: "https://aaronshin.dev",
    siteName: "Aaron Shin Portfolio",
    images: [
      { url: "/og-image.svg", width: 1200, height: 630, alt: "Aaron Shin Portfolio" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaron Shin — Developer Portfolio",
    description:
      "CS & Math student, undergraduate ML researcher, hackathon winner.",
    images: ["/og-image.svg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aaron Shin",
  alternateName: "Jeongcheol Shin",
  url: "https://aaronshin.dev",
  email: "aaronshin.exe@gmail.com",
  sameAs: [
    "https://github.com/aaronshin43",
    "https://linkedin.com/in/aaron-shin-377477350",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Dickinson College",
  },
  knowsAbout: [
    "Machine Learning",
    "Transformer Models",
    "Next.js",
    "Python",
    "Computer Science",
    "Mathematics",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-lavender-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-2 focus:outline-lavender-400 focus:outline-offset-2"
        >
          Skip to main content
        </a>
        <Navbar />
        {children}
        <NekoLoader />
      </body>
    </html>
  );
}
