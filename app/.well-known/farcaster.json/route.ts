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
      homeUrl: "https://2048-farcaster-miniapp-seven.vercel.app/",
      iconUrl: "https://2048-farcaster-miniapp-seven.vercel.app/icon.png",
      splashImageUrl: "https://2048-farcaster-miniapp-seven.vercel.app/splash.png",
      splashBackgroundColor: "#FF8C32",
      webhookUrl: "https://2048-farcaster-miniapp-seven.vercel.app/api/webhook",
      primaryCategory: "games",
      tags: ["puzzle", "2048", "game", "farcaster"],
      heroImageUrl: "https://2048-farcaster-miniapp-seven.vercel.app/screenshot1.png",
      screenshotUrls: [
        "https://2048-farcaster-miniapp-seven.vercel.app/screenshot1.png",
        "https://2048-farcaster-miniapp-seven.vercel.app/screenshot2.png"
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
