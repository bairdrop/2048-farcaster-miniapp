import type { Metadata } from "next";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://2048-farcaster-miniapp-seven.vercel.app';

export const metadata: Metadata = {
  title: "2048 Farcaster",
  description: "Play the classic 2048 puzzle game on Farcaster",
  openGraph: {
    title: "2048 Farcaster",
    description: "Play the classic 2048 puzzle game on Farcaster",
    images: [`${appUrl}/screenshot1.png`],
  },
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: `${appUrl}/screenshot1.png`,
      button: {
        title: 'Play 2048',
        action: {
          type: 'launch_frame',
          name: '2048 Farcaster',
          url: appUrl,
          splashImageUrl: `${appUrl}/splash.png`,
          splashBackgroundColor: '#8F7A66'
        }
      }
    })
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
