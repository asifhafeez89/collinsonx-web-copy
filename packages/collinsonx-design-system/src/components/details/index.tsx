import React from 'react';
import styled from '@emotion/styled';
import { Box, Flex, Stack } from '@mantine/core';

type InfoGroup = {
  header?: string;
  description?: string;
  icon?: React.ReactNode;
  direction?: 'row| column';
};

interface LoungeDetailsProps {
  title?: string;
  infos: InfoGroup[];
  direction: 'row';
}

/**
 * Primary UI component for user interaction
 */
export default function LoungeDetails({
  title,
  infos,
  direction,
}: LoungeDetailsProps) {
  return (
    <div>
      <Flex direction={direction} align="center" gap={48}>
        {infos.map((info, i) => (
          <div key={i}>
            <Box fw={600}>{info.header}</Box>
            <Box>{info.description}</Box>
          </div>
        ))}
      </Flex>
    </div>
  );
}
