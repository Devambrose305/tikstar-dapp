import { Plus_Jakarta_Sans, Noto_Sans_SC } from 'next/font/google';

// Modern Display Font
export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

// Chinese Font
export const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto',
}); 