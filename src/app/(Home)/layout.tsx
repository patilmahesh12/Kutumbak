"use client";
import Navbar from "@/components/Navbar";
import "../globals.css";
import ToastContainer from "@/components/ToastContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Kutumbak | Connect With Your Community</title>
      </head>
      <body className={`antialiased`}>
        <ToastContainer />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
