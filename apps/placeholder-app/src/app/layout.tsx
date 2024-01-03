import { Inter } from 'next/font/google';
import { Box, MantineProvider } from '@collinsonx/design-system/core';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BaaS Testing App',
  description: 'BaaS Testing App',
};

import '../../node_modules/@collinsonx/design-system/dist/assets/dates.styles.css';
import '../../node_modules/@collinsonx/design-system/dist/assets/styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>
          <Box m={8}>{children}</Box>
        </MantineProvider>
      </body>
    </html>
  );
}
