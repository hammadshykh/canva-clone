import type React from "react";
import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

export const metadata: Metadata = {
 title: "Canva Workspace - Design Made Simple",
 description:
  "Create stunning designs with our intuitive workspace. Design presentations, social media posts, and more with professional templates.",
 generator: "Canva Workspace",
 keywords: [
  "design",
  "templates",
  "workspace",
  "canva",
  "graphics",
  "social media",
 ],
 authors: [{ name: "Canva Workspace" }],
 creator: "Canva Workspace",
 publisher: "Canva Workspace",
 formatDetection: {
  email: false,
  address: false,
  telephone: false,
 },
 icons: {
  icon: [
   { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
   { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  ],
  apple: [
   { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
  shortcut: "/favicon.ico",
 },
 manifest: "/site.webmanifest",
 openGraph: {
  title: "Canva Workspace - Design Made Simple",
  description: "Create stunning designs with our intuitive workspace",
  url: "https://your-domain.com",
  siteName: "Canva Workspace",
  images: [
   {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Canva Workspace",
   },
  ],
  locale: "en_US",
  type: "website",
 },
 twitter: {
  card: "summary_large_image",
  title: "Canva Workspace - Design Made Simple",
  description: "Create stunning designs with our intuitive workspace",
  images: ["/twitter-image.png"],
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <head>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/favicon.png" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta name="theme-color" content="#00C4CC" />
    <meta name="msapplication-TileColor" content="#00C4CC" />
   </head>
   <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <StackProvider app={stackServerApp}>
     <StackTheme>
      <ConvexClientProvider>{children}</ConvexClientProvider>
     </StackTheme>
    </StackProvider>
   </body>
  </html>
 );
}
