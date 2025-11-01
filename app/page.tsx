'use client';

import { useEffect } from 'react';
import { sdk } from '@farcaster/frame-sdk';
import Game2048 from '../components/Game2048';

export default function Home() {
  useEffect(() => {
    const initSDK = async () => {
      try {
        await sdk.actions.ready();
        console.log('Frame SDK initialized');
      } catch (error) {
        console.error('Failed to initialize SDK:', error);
      }
    };
    
    initSDK();
  }, []);

  return (
    <main className="min-h-screen">
      <Game2048 />
    </main>
  );
}
```

**Key change:** Changed the import from `@/components/Game2048` to `../components/Game2048`

## 2. **components/Game2048.tsx** (move this file)

Move your existing `Game2048.tsx` file to a new `components` folder at the root level (same level as the `app` folder).

Your file structure should look like:
```
your-project/
├── app/
│   ├── api/
│   │   └── manifest/
│   │       └── route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/            ← CREATE THIS FOLDER
│   └── Game2048.tsx       ← MOVE FILE HERE
├── public/
├── package.json
├── next.config.js
└── tailwind.config.js
