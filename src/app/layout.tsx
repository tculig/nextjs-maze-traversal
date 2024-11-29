'use client';

import { Sen } from "next/font/google";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyles, StyledComponentsRegistry } from './lib';

const sen = Sen({ style: 'normal', subsets: ['latin'], variable: '--font-family' });
const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sen.variable}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
