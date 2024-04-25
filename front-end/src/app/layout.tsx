import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MusicPlayerContextProvider } from '@/context/MusicPlayerContext'
import { Footer } from '@/components/Footer'
import { Aside } from '@/components/Aside'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Spotify',
    default: "Spotify"
  },
  description: 'this a web music player',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className='scrollbar-thumb-sky-700 scrollbar-track-sky-300'>
      <body
        className={`${inter.variable} font-sans bg-zinc-900 text-zinc-50`}
      >
        <MusicPlayerContextProvider>
          <div className="h-screen flex flex-col">
            <div className="flex flex-1">
              <Aside />
              <div className='flex-1  overflow-auto h-[85vh]'>
                {children}

              </div>

            </div>
            <Footer />

          </div>


        </MusicPlayerContextProvider>
      </body>
    </html>
  )
}
