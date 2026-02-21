import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/layout/Navbar"
import { Mascot } from "@/components/layout/Mascot"

export const metadata: Metadata = {
  title: 'The Verbal Vantage | CUET Excellence',
  description: 'Elite CUET 2026 English preparation with clinical strategy and practice.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col relative" suppressHydrationWarning>
        <Navbar />
        <div className="flex-1 pb-20">
          {children}
        </div>
        <Mascot />
        <footer className="fixed bottom-0 w-full py-4 text-center text-sm font-medium text-muted-foreground bg-white/80 backdrop-blur-md border-t z-50">
          Created by <span className="text-primary font-bold">Shalaka Kashikar</span>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}