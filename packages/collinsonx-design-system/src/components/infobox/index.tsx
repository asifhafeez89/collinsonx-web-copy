import React from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mantine/core';
import { ActionIcon } from '../../core';
import { Edit, CalendarB, Aeroplane } from '../../assets/icons';

interface InfoBoxProps {
  handleEditClick: () => void;
  title: string;
  date: string;
  flight: string;
}

/**
 * Primary UI component for user interaction
 */
export default function InfoBox({
  title,
  date,
  flight,
  handleEditClick,
}: InfoBoxProps) {
  const Wrapper = styled.div`
    border-radius: 10px;
    border: 1px solid #e9ecef;
    padding: 20px;
    margin-bottom: 10px;
    background: #ffffff;
  `;

  return (
    <Wrapper>
      <Grid grow gutter={2} gutterXs="md" gutterMd="xl" gutterXl={20}>
        <Grid.Col span={7}>
          <Grid grow gutter={2}>
            <Grid.Col span={12}>{title}</Grid.Col>
            <Grid.Col span={5}>
              <Aeroplane w={24} h={24} />
              &nbsp;
              {flight}
            </Grid.Col>
            <Grid.Col span={7}>
              <CalendarB w={24} h={24} />
              &nbsp;
              {date}
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={1}>
          <ActionIcon
            color="dark.6"
            onClick={handleEditClick}
            sx={{
              position: 'absolute',
              top: 50,
              right: 40,
            }}
          >
            <Edit w={24} h={24} />
          </ActionIcon>
        </Grid.Col>
      </Grid>
    </Wrapper>
  );
}
