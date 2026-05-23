import type {Metadata} from 'next';
import { Inter, Playfair_Display } from "next/font/google";
import './globals.css'; // Global styles

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Make Todo Dia | Dicas de Maquiagem',
  description: 'Dicas de maquiagem para todos os dias da semana.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-stone-50 font-sans text-stone-900 antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
