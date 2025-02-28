import type { Metadata } from 'next'
import './globals.css'
import { UserProvider } from '@/context/UserContext'
import { ContractProvider } from '@/contexts/ContractContext'

export const metadata: Metadata = {
  title: 'TikStar Coin',
  description: 'TikTok Network Economic Value',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black font-sans antialiased">
        <UserProvider>
          <ContractProvider>
            {children}
          </ContractProvider>
        </UserProvider>
      </body>
    </html>
  );
}
