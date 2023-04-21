import React from 'react';
import styled from '@emotion/styled';
import { Flex, Grid, Image } from '@mantine/core';

import { MapPin, Clock } from '../../assets/icons';
import Heading from '../heading/Heading';

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
  padding: 1rem;
  margin: -30px;
  padding: 20px 45px;
  padding-top: 20px;

  h3 {
    margin: 30px;
  }
`;

/**
 * Primary UI component for user interaction
 */
export default function LoungeDetails({ title, infos }: LoungeDetailsProps) {
  return (
    <ContentWrapper>
      <Heading as="h3">{title}</Heading>
      {infos.map((info, i) => (
        <Grid key={i} grow gutter={2} gutterXs="md" gutterMd="xl" gutterXl={20}>
          <Grid.Col span={1}>
            <Grid sx={{ marginTop: '3px' }}>{info.icon}</Grid>
          </Grid.Col>
          <Grid.Col span={11}>
            <Flex
              mih={70}
              direction="column"
              wrap="wrap"
              sx={{
                alignItems: 'flex-start',
              }}
            >
              <span>
                <strong>{info.header}</strong>
              </span>
              <span>{info.description}</span>
            </Flex>
          </Grid.Col>
        </Grid>
      ))}
    </ContentWrapper>
  );
}
