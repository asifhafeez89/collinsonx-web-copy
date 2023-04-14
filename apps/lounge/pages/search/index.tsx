import { useState, useEffect, ComponentProps } from 'react';
import LayoutPaddingLess from '@components/LayoutPaddingLess';
import { Container, Box } from '@collinsonx/design-system/core';

import { Calendar } from '@collinsonx/design-system/assets/icons';
import { Heading } from '@collinsonx/design-system/components/heading/Heading';
import { Text, Stack, Group, Button } from '@collinsonx/design-system/core';
import FormWrapper from '@collinsonx/design-system/components/formWrapper/formWrapper';
import { DatePicker, InputLabel } from '@collinsonx/design-system';
import { useForm } from '@collinsonx/design-system/form';
import dayjs from 'dayjs';
import router, { useRouter } from 'next/router';
export interface BookLoungeProps {
  flightNumber: string;
  dateofflight: Date;
}
export default function Search() {
  const router = useRouter();
  const [date, setDate] = useState<Date | null>(new Date());
  const DATE_FORMAT = 'DD/MM/YYYY';

  const flightNumber = router.query?.flightnumber;
  const flightDate = router.query?.dateofflight ?? null;

  const form = useForm({
    initialValues: {
      flightNumber: flightNumber ?? '',
      dateofflight: (flightDate as string) ?? new Date(),
    },

    validate: {
      flightNumber: (value) =>
        value?.length > 0 ? null : 'Please enter your flight number.',
    },
  });

  return (
    <div style={{ background: '#f5f5f5', height: '100vh' }}>
      <Container
        px={24}
        sx={{
          '@media (max-width: 768px)': {
            width: '100%',
          },
          width: '375px',
          background: '#25262B',
        }}
      >
        <Stack
          spacing={10}
          sx={{
            paddingTop: '20px',
            margin: '0',
          }}
        >
          <Heading
            as="h1"
            color="#ffffff"
            subtitle="Welcome"
            subtitleColor="#20C997"
          >
            Tony Stark
          </Heading>
        </Stack>
      </Container>
      <Container
        p={0}
        sx={{
          '@media (max-width: 768px)': {
            width: '100%',
          },
          width: '375px',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'block',
            height: '576px',
            top: '0px',
            background: '#25262B',
            backgroundPositionY: 'center',
          }}
        >
          <div
            style={{
              opacity: '0.5',
              zIndex: 400,
              height: '32vh',
              width: '100%',
              background: '#25262B',
              position: 'absolute',
              top: '20px',
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              top: '0px',
              zIndex: 1100,
            }}
          >
            <Container>
              <Text color="#ffffff">
                Visiting an airport lounge can be a great way to make your
                travel experience more comfortable, enjoyable, and stress-free.
              </Text>
            </Container>
          </div>
          <div
            style={{
              position: 'absolute',
              backgroundColor: '#25262B',
              backgroundImage: 'url(/lounge/loungeimage.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              zIndex: 100,
              top: '40px',
              height: '250px',
              width: '100%',
            }}
          ></div>
          <FormWrapper>
            <Heading as="h2">Experience starts now</Heading>

            <form
              onSubmit={form.onSubmit((values) => {
                router.push({
                  pathname: '/search/results',
                  query: {
                    flightnumber: values.flightNumber,
                    dateofflight: values.dateofflight.toString(),
                  },
                });
              })}
            >
              <InputLabel
                autoFocus
                type="text"
                withAsterisk
                {...form.getInputProps('flightNumber')}
                placeholder="Flight number"
                label="Flight Number"
                isWhite={false}
              />
              <DatePicker
                icon={<Calendar />}
                sx={({ colors }) => ({
                  '.mantine-Input-icon': {
                    paddingLeft: 14,
                  },
                  marginBottom: '20px',
                  Input: {
                    paddingLeft: 56,
                    border: '1px solid #CED4DA',
                    borderRadius: 4,
                    color: colors.gray[6],
                    paddingBottom: '20px',
                    width: '100%',
                  },
                  label: {
                    color: colors.gray[8],
                    marginTop: '10px',
                  },
                })}
                label="Date of flight"
                placeholder="Pick a date"
                clearable={false}
                valueFormat={DATE_FORMAT}
                minDate={new Date(flightDate as string)}
                {...form.getInputProps('dateofflight')}
                required={true}
              />
              <Button fullWidth type="submit">
                Search
              </Button>
            </form>
          </FormWrapper>
        </div>
      </Container>
    </div>
  );
}

Search.getLayout = (page: JSX.Element) => (
  <LayoutPaddingLess>{page}</LayoutPaddingLess>
);
