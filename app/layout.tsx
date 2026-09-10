import type { Metadata } from "next";
import "./globals.css";

const siteUrl = new URL("https://dalbenmattia.com");
const description =
  "Direzione, riprese e post-produzione per brand, eventi e storie con un punto di vista.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Dal Ben Mattia — Videomaker",
  description,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "Dal Ben Mattia — Film con un punto di vista",
    description,
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    images: [
      {
        url: "/og.png",
        width: 1792,
        height: 917,
        alt: "Dal Ben Mattia — Film con un punto di vista",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dal Ben Mattia — Film con un punto di vista",
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
