import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    frame: {
      name: "2048 Farcaster",
      version: "1",
      iconUrl: "https://2048-farcaster-miniapp-seven.vercel.app/icon.png",
      homeUrl: "https://2048-farcaster-miniapp-seven.vercel.app",
      imageUrl: "https://2048-farcaster-miniapp-seven.vercel.app/image.png",
      buttonTitle: "START",
      splashImageUrl: "https://2048-farcaster-miniapp-seven.vercel.app/splash.png",
      splashBackgroundColor: "#FF8C32",
      webhookUrl: "https://2048-farcaster-miniapp-seven.vercel.app/api/webhook",
      subtitle: "The best 2048 Farcaster game",
      description: "2048 is an addictive puzzle game where you slide and merge tiles to reach the 2048 tile. Simple to play, hard to stop.",
      screenshotUrls: [
        "https://2048-farcaster-miniapp-seven.vercel.app/screenshot1.png"
      ],
      primaryCategory: "games",
      tags: [
        "2048",
        "game",
        "farcaster",
        "2048game",
        "puzzle"
      ],
      tagline: "The best 2048 Farcaster game",
      ogTitle: "The best 2048 Farcaster game",
      ogDescription: "The best 2048 Farcaster game",
      ogImageUrl: "https://2048-farcaster-miniapp-seven.vercel.app/screenshot1.png"
    },
    accountAssociation: {
      header: "",
      payload: "",
      signature: ""
    }
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
