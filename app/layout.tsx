import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JinXie 7empest - Semi Fullstack Developer",
  description:
    "The Semi Fullstack Developers that keep moving on programming language, his journey is not only for his hobby",
  keywords: ["fullstack developer", "web development", "React", "Node.js", "JavaScript", "TypeScript", "programming"],
  authors: [{ name: "JinXie 7empest" }],
  creator: "JinXie 7empest",
  publisher: "JinXie 7empest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jinxie7empest.vercel.app",
    title: "JinXie 7empest - Semi Fullstack Developer",
    description:
      "The Semi Fullstack Developers that keep moving on programming language, his journey is not only for his hobby",
    siteName: "JinXie 7empest Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "JinXie 7empest - Semi Fullstack Developer",
    description:
      "The Semi Fullstack Developers that keep moving on programming language, his journey is not only for his hobby",
    creator: "@Jinxieprotocol",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#dc2626" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
