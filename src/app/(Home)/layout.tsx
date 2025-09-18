"use client";

import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "../globals.css";
import ToastContainer from "@/components/ToastContainer";
import { UserProvider, useUser } from "@/context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import { Family } from "@/types/family";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <UserProvider>
      <MainContent>{children}</MainContent>
    </UserProvider>
  );
};

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const getUserFromToken = async () => {
      try {
        const response = await axios.get("/api/user/verifyUser");
        if (response.data.family) {
          setUser(response.data.family as Family);
        } else {
          setUser(null);
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to verify token:", error);
        setUser(null);
        router.push("/");
      }
    };
    getUserFromToken();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kutumbak | Connect With Your Community</title>
        <link rel="icon" href="/community.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className}`}>
        <Navbar />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
