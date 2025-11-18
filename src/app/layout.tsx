import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";



const montserrat = Montserrat({
  subsets: ['latin'], // Specify the necessary subsets
  display: 'swap',  
});

export const metadata: Metadata = {
  title: "Basic Url Shortner",
  description: "basic url shortner app",
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
        {children}
      </body>
    </html>
  );
}
