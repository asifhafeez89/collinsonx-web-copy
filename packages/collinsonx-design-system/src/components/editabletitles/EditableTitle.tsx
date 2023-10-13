import Head from 'next/head';
import Heading from '../heading/Heading';
import { Box, Flex, Stack } from '@mantine/core';
import { Pencil } from '../../assets/icons';
import Link from 'next/link';

interface EditableTitlesProps {
  title: string;
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'legend';
  children: React.ReactNode;
  to?: string | null;
}

export default function EditableTitle({
  title,
  as,
  children,
  to = null,
}: EditableTitlesProps) {
  return (
    <Box
      sx={{
        '@media (max-width: 768px)': {
          backgroundColor: '#fff',
          padding: '20px',
          width: '100%',
        },
      }}
    >
      <Flex direction="row" justify="space-between" align="center">
        <Heading as={as} padding={0} margin={0}>
          {title}
        </Heading>

        {to !== null && (
          <Link href={to}>
            {' '}
            <Pencil />
          </Link>
        )}
      </Flex>
      {children}
    </Box>
  );
}
