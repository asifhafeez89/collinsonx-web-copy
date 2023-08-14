import { Flex } from '@collinsonx/design-system/core';

export interface ResultsItemProps {
  leftIcon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function ResultsItem({
  leftIcon,
  children,
  onClick,
}: ResultsItemProps) {
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
      style={{
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={() => onClick && onClick()}
    >
      {leftIcon}
      {children}
    </Flex>
  );
}
