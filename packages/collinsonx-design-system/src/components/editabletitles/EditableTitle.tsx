import Head from 'next/head';
import Heading from '../heading/Heading';
import { Box, Flex, Stack } from '@mantine/core';
import { Pencil } from '../../assets/icons';
import Link from 'next/link';

interface EditableTitlesProps {
  title: string;
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'legend';
  children: React.ReactNode;
  to?: string;
}

export default function EditableTitle({
  title,
  as,
  children,
  to,
}: EditableTitlesProps) {
  return (
    <Stack
      sx={{
        '@media (max-width: 40em)': {
          background: '#fff',
          padding: '20px',
        },
      }}
    >
      <Flex direction="row" justify="space-between" align="center">
        <Heading as={as} padding={0} margin={0}>
          {title}
        </Heading>
        {to && (
          <Link href={to}>
            {' '}
            <Pencil />
          </Link>
        )}
      </Flex>
      {children}
    </Stack>
  );
}
