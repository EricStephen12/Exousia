import { Inter, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';

// Google fonts
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

// Local fonts
export const clashDisplay = localFont({
  src: './ClashDisplay-Bold.woff2',
  display: 'swap',
  variable: '--font-clash-display',
});

export const satoshi = localFont({
  src: [
    {
      path: './Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-satoshi',
});

export const italiana = localFont({
  src: './Italiana-Regular.ttf',
  display: 'swap',
  variable: '--font-italiana',
}); 