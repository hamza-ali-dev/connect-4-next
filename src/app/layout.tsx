import "~/styles/globals.css";

import { Inter } from "next/font/google";
import AppProvider from "~/providers/AppProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Connect four",
  description: "This is Next.js implementation of connect four game.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} h-screen`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
