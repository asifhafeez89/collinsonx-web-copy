import { ChevronLeft } from '@collinsonx/design-system/assets/icons';
import { ActionIcon, Flex, Text, Title } from '@collinsonx/design-system/core';
import Link from 'next/link';
import classes from './OutletHeading.module.css';

export interface OutletHeadingProps {
  name: string;
  id?: string;
  locationName?: string | null;
  terminal?: string | null;
}

const OutletHeading = ({
  id,
  name,
  locationName,
  terminal,
}: OutletHeadingProps) => {
  return (
    <Flex className={classes.outletHeadingContainer}>
      <ActionIcon
        variant="default"
        data-testid="viewAllOutlets"
        component={Link}
        href="/outlets"
        aria-label="Back to Outlets"
        className={classes.actionIcon}
      >
        <ChevronLeft />
      </ActionIcon>
      <Flex className={classes.titleContainer}>
        <Title
          id={id}
          data-testid="outlet-title"
          className={classes.outletTitle}
          fz={{ base: 24, lg: 32 }}
        >
          {name}
        </Title>
        <Text data-testid="outlet-subtitle" className={classes.outletSubtitle}>
          {locationName}
          {terminal && `, ${terminal}`}
        </Text>
      </Flex>
    </Flex>
  );
};

export default OutletHeading;
