import Head from 'next/head';
import Heading from '../heading/Heading';
import { Box, Flex, Stack } from '@mantine/core';
import { Pencil } from '../../assets/icons';
import Link from 'next/link';
import colors from '../../colour-constants';

interface EditableTitlesProps {
  title: string;
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'legend';
  children: React.ReactNode;
  to?: string | null;
  showBorder?: boolean;
}

export default function EditableTitle({
  title,
  as,
  children,
  to = null,
  showBorder = true,
}: EditableTitlesProps) {
  return (
    <Stack
      p={{ base: '20px', xl: '20px 0' }}
      sx={{
        borderBottom: showBorder
          ? `1px solid ${colors.borderSection}`
          : 'initial',
        paddingBottom: '20px',

        '@media (max-width: 768px)': {
          backgroundColor: '#fff',
          width: '100%',
          borderBottom: 'initial',
          paddingBottom: '2rem',
        },
      }}
    >
      <Flex direction="row" justify="space-between" align="center">
        <Heading as={as} margin={0} padding={0}>
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
    </Stack>
  );
}
