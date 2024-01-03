import { ChevronLeft } from '@collinsonx/design-system/assets/icons';
import colors from '@collinsonx/design-system/colour-constants-partner';
import { ActionIcon, Flex, Text, Title } from '@collinsonx/design-system/core';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import classes from './OutletHeading.module.css';

export interface OutletHeadingProps {
  name: string;
  locationName?: string | null;
  terminal?: string | null;
}

const OutletHeading = ({
  name,
  locationName,
  terminal,
}: OutletHeadingProps) => {
  const [isScrolled, setScrolled] = useState(false);
  const [initialPosition, setInitialPosition] = useState<number | null>(null);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;

    if (!initialPosition) {
      setInitialPosition(scrollY);
    }

    setScrolled(scrollY > 120);
  }, [initialPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Flex
      bg={colors['white']}
      p={{ base: 16, md: 24 }}
      style={{
        position: isScrolled ? 'fixed' : 'relative',
        top: isScrolled ? 0 : 'auto',
        width: '100%',
        borderBottom: '1px solid #D5D5D5',
        boxShadow: isScrolled ? '0px 6px 6px rgba(0, 0, 0, 0.10)' : 'none',
      }}
    >
      <Flex gap={16}>
        <ActionIcon
          variant="default"
          data-testid="viewAllOutlets"
          component={Link}
          href="/outlets"
          aria-label="Back to Outlets"
          style={{
            width: '44px',
            height: '44px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChevronLeft />
        </ActionIcon>
        <Flex
          gap={8}
          direction={{ base: 'column', xs: isScrolled ? 'row' : 'column' }}
          style={{
            alignItems: isScrolled ? 'baseline' : 'auto',
          }}
        >
          <Title
            data-testid="outlet-title"
            className={classes.outletTitle}
            mt={2}
            fz={{ base: 24, lg: 32 }}
          >
            {name}
          </Title>
          <Text
            data-testid="outlet-subtitle"
            className={classes.outletSubtitle}
          >
            {locationName}
            {terminal && `, ${terminal}`}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OutletHeading;
