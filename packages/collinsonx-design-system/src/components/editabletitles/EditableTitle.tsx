import Head from 'next/head';
import Heading from '../heading/Heading';
import { Box, Flex, Stack } from '@mantine/core';
import { Pencil } from '../../assets/icons';
import Link from 'next/link';
import clsx from 'clsx';
import colors from '../../colour-constants-baas';

import classes from '../../assets/components/editableTitles.module.css';

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
      p={{ base: '20px', lg: '10px 0', xl: '10px 0' }}
      className={clsx([
        classes.container,
        { [classes.showBorder]: showBorder },
      ])}
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
