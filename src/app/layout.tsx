import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/client";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meet.AI",
  description: "Your AI Meeting Interviewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <html lang="en">
        <body className={`${roboto.className} antialiased`}>{children}</body>
      </html>
    </TRPCReactProvider>
  );
}
