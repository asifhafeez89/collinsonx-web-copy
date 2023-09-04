import React from 'react';
import {
  Title,
  Image,
  Flex,
  Text,
  Stack,
} from '@collinsonx/design-system/core';

interface LoungeInfoProps {}

export const LoungeInfo = ({}: LoungeInfoProps) => {
  return (
    <>
      <Flex
        gap={16}
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        p={24}
      >
        <Image
          width={176}
          height={128}
          mx="auto"
          src="https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg"
          alt="lounge image"
        />
        <Stack>
          <Title order={2} size={32}>
            {'[Lounge Name]'}
          </Title>
          <Text size={18}>{'[Airport], [Terminal]'}</Text>
          <Text size={28}>{'£8.00 GBP'}</Text>
        </Stack>
      </Flex>
    </>
  );
};