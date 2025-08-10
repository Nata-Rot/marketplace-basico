import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' 
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/components/AuthProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Marketplace',
  description: 'Un marketplace simple para negocios y clientes locales',
  icons: {
    icon: '/icon.png',        
    shortcut: '/icon.png',
    apple: '/icon.png',      
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icon.png',       
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>{children}</main>
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
