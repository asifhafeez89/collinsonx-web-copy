import React from 'react';
import styled from '@emotion/styled';
import { Flex, Grid, Image } from '@mantine/core';

interface LoungeImageTitleProps {
  title: string;
  image: string;
}

const ContentWrapper = styled.div`
  padding: 1rem;
`;

/**
 * Primary UI component for user interaction
 */
export default function LoungeImageTitle({
  title,
  image,
}: LoungeImageTitleProps) {
  return (
    <ContentWrapper>
      <Grid grow gutter={2} gutterXs="md" gutterMd="xl" gutterXl={20}>
        <Grid.Col span={3}>
          <Grid>
            {image && <Image width={120} height={80} src={image} alt={title} />}
          </Grid>
        </Grid.Col>
        <Grid.Col span={6}>
          <Flex
            mih={70}
            gap="md"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
            sx={{
              alignItems: 'center',
            }}
          >
            <strong>{title}</strong>
          </Flex>
        </Grid.Col>
      </Grid>
    </ContentWrapper>
  );
}
