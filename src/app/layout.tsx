import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "./ui/fonts";
import NavBar from "./ui/layout/NavBar";
import Footer from "./ui/layout/footer";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven Group 11 Project',
    default: 'Handcrafted Haven Group 11 Project'
  },
  description: 'This is our project version of the Handcrafted project for BYUI WDD 430.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="HC Haven" />
      </head>
      <body className={`${montserrat.className} antialiased`}>
        <SessionProvider>
          <header>
            <NavBar />
          </header>
          {children}
          <Footer />
        </SessionProvider>
      </body>
      
    </html>
  );
}
