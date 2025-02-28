import { Inter, Noto_Sans_SC } from 'next/font/google';

// Latin characters
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Chinese characters
export const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-sc',
}); 