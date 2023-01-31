import { Flex } from '@collinson/design-system/core';

export interface ResultsItemProps {
  leftIcon: JSX.Element;
  children: JSX.Element | string;
}

export default function ResultsItem({ leftIcon, children }: ResultsItemProps) {
  return (
    <Flex
      align="center"
      gap={24}
      py={16}
      sx={({ colors }) => ({
        color: '#000',
        borderBottom: `1px solid ${colors.dark[0]}`,
        fontSize: '16px',
        fontWeight: 600,
      })}
    >
      {leftIcon}
      {children}
    </Flex>
  );
}
