import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "./ui/fonts";
import NavBar from "./library/NavBar";


export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven Group 11 Project',
    default: 'Handcrafted Haven Group 11 Project'
  },
  description: 'This is our project version of the Handcrafted project for BYUI WDD 430.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${montserrat.className} antialiased`}
      >
        <header>
        <NavBar/>
      </header>
        
        {children}
      </body>
    </html>
  );
}
