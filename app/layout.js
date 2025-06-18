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

export const metadata = {
  title: "PixiPush- File Sharing Made Easy",
  keywords: [
    "file sharing",
    "upload files",
    "share files",
    "secure file transfer",
    "cloud storage",
    "file hosting",
    "document sharing",
    "image sharing",
    "video sharing",
    "file management"
  ],
  authors: [
    {
      name: "PixiPush Team",
      url: "https://PixiPush.com",
    },
  ],
  description: "A simple file sharing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
