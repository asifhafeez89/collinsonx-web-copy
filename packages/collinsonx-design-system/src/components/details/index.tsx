import React from 'react';
import styled from '@emotion/styled';
import { Box, Flex, Stack } from '@mantine/core';

type InfoGroup = {
  header?: string;
  description?: string;
  icon?: React.ReactNode;
};

interface LoungeDetailsProps {
  title?: string;
  infos: InfoGroup[];
}

const ContentWrapper = styled.div`
  background: #fff;
`;

/**
 * Primary UI component for user interaction
 */
export default function LoungeDetails({ title, infos }: LoungeDetailsProps) {
  return (
    <ContentWrapper>
      <Stack spacing={8}>
        {infos.map((info, i) => (
          <Flex direction="row" align="center" key={i} gap={8}>
            <Flex align="center">{info.icon}</Flex>
            <Box fw={600}>{info.header}</Box>
            <Box>{info.description}</Box>
          </Flex>
        ))}
      </Stack>
    </ContentWrapper>
  );
}
