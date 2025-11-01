// Farcaster Frame Configuration
interface AccountAssociation {
  header?: string;
  payload?: string;
  signature?: string;
}

interface FrameConfig {
  name: string;
  subtitle?: string;
  description?: string;
  version: string;
  url: string;
  iconUrl: string;
  splashImageUrl: string;
  splashBackgroundColor: string;
  homeUrl: string;
  screenshotUrls?: string[];
  primaryCategory?: string;
  tags?: string[];
  accountAssociation?: AccountAssociation;
}

interface AppConfig {
  frame: FrameConfig;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-farcaster-app-url.vercel.app';

export const config: { app: AppConfig } = {
  app: {
    frame: {
      name: '2048 Farcaster',
      subtitle: 'Classic puzzle game on Farcaster',
      description: 'Join the numbers to reach 2048! A classic sliding puzzle game where you combine tiles with the same numbers. Swipe to move tiles and merge them together. Can you reach 2048?',
      version: '1.0.0',
      url: APP_URL,
      iconUrl: `${APP_URL}/icon.png`,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: '#4F46E5',
      homeUrl: APP_URL,
      screenshotUrls: [
        `${APP_URL}/screenshot1.png`,
        `${APP_URL}/screenshot2.png`
      ],
      primaryCategory: 'games',
      tags: ['puzzle', 'casual', 'strategy', 'numbers'],
      accountAssociation: {
        header: "YOUR_NEW_HEADER_HERE",
        payload: "YOUR_NEW_PAYLOAD_HERE",
        signature: "YOUR_NEW_SIGNATURE_HERE"
      }
    }
  }
};
