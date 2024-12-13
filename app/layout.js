import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "SHARE NEXT APP",
  description: "Making file share easy",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={inter.className}>
        {children}
        </body>
    </html>
    </ClerkProvider>
  );
}
