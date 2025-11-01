import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    accountAssociation: {
      header: "YOUR_NEW_HEADER_HERE", // Generate new ones for your Farcaster account
      payload: "YOUR_NEW_PAYLOAD_HERE",
      signature: "YOUR_NEW_SIGNATURE_HERE"
    },
    frame: {
      version: "1",
      name: "2048 Farcaster",
      subtitle: "Classic 2048 puzzle game on Farcaster",
      description: "Play the addictive 2048 puzzle game. Swipe to combine tiles and reach 2048!",
      homeUrl: "https://your-farcaster-app-url.vercel.app/",
      iconUrl: "https://your-farcaster-app-url.vercel.app/icon.png",
      splashImageUrl: "https://your-farcaster-app-url.vercel.app/splash.png",
      splashBackgroundColor: "#FF8C32",
      webhookUrl: "https://your-farcaster-app-url.vercel.app/api/webhook",
      primaryCategory: "games",
      tags: ["puzzle", "2048", "game", "farcaster"],
      heroImageUrl: "https://your-farcaster-app-url.vercel.app/screenshot1.png",
      screenshotUrls: [
        "https://your-farcaster-app-url.vercel.app/screenshot1.png",
        "https://your-farcaster-app-url.vercel.app/screenshot2.png"
      ]
    }
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
