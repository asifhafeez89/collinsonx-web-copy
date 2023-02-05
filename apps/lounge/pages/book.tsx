import {
  Stack,
  Flex,
  Paper,
  UnstyledButton,
} from '@collinsonx/design-system/core';
import Layout from '../components/Layout';
import { client } from '@collinsonx/utils/apollo';
import getLounge from '../gql/getLounge';
import {
  InputSelect,
  InputTextArea,
  PageTitle,
  Lounge,
  DatePicker,
} from '@collinsonx/design-system';
import { Clock, Calendar } from '@collinsonx/design-system/assets/icons';
import { useRouter } from 'next/router';
import { LoungeData } from '@collinsonx/utils/types/lounge';
import { NextPageContext } from 'next';
import { useState } from 'react';

interface BookLoungeProps {
  lounge: LoungeData;
  loading: boolean;
}

export default function Book(props: BookLoungeProps) {
  const router = useRouter();
  const { lounge, loading } = props;
  const [reservationDate, setReservationDate] = useState<Date>();

  const onDateChange = (newDate: Date) => {
    setReservationDate(newDate);
  };

  const onTimeChange = () => {};

  const handleBook = () => {
    router.push({
      pathname: '/confirm',
      query: { id: lounge.id },
    });
  };

  return (
    <>
      {loading && !lounge && <div>loading...</div>}
      {!loading && lounge && (
        <Stack sx={{ position: 'relative' }}>
          <PageTitle title={`Book ${lounge?.name}`} url={'/lounge/details'} />
          <Lounge
            airport={lounge?.location}
            loungeName={lounge?.name}
            openingTimes={lounge?.openingHours}
          />
          <Flex direction="column">
            <Paper mt={10} radius="md">
              <DatePicker
                placeholder="Pick date"
                label="Date"
                withAsterisk
                inputFormat="DD/MM/YYYY"
                labelFormat="DD/MM/YYYY"
                styles={{
                  label: {
                    color: 'black',
                    fontWeight: 600,
                  },
                }}
                onChange={onDateChange}
              />
            </Paper>
            <Paper mt={30} radius="md">
              <InputSelect
                label="Time of arrival"
                withAsterisk
                description="Please check lounge conditions for access times"
                icon={<Clock size={14} />}
                onChange={onTimeChange}
                data={[
                  '00:00',
                  '01:00',
                  '02:00',
                  '03:00',
                  '04:00',
                  '05:00',
                  '06:00',
                  '07:00',
                  '08:00',
                  '09:00',
                  '10:00',
                  '11:00',
                  '12:00',
                  '13:00',
                  '14:00',
                  '15:00',
                  '16:00',
                  '17:00',
                  '18:00',
                  '19:00',
                  '20:00',
                  '21:00',
                  '22:00',
                  '23:00',
                ]}
                required={true}
              />
            </Paper>
            <Paper mt={30} radius="md">
              <InputTextArea
                placeholder="Your comment"
                label="Your comment"
                description="Add any considerations for lounge staff"
                autosize
                minRows={2}
                maxRows={4}
              />
            </Paper>
            <Paper mt={30} radius="md">
              <UnstyledButton
                onClick={handleBook}
                sx={{
                  borderRadius: 8,
                  background: '#000000',
                  color: '#ffffff',
                  padding: '12px 24px',
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '18px',
                }}
              >
                Confirm details
              </UnstyledButton>
            </Paper>
          </Flex>
        </Stack>
      )}
    </>
  );
}

type Lounge = {
  id: string;
};

interface QueryProps extends NextPageContext {
  lounge: Lounge;
}

export async function getServerSideProps({ query }: QueryProps) {
  const loungeId = query?.id ?? '';

  const { data, loading } = await client.query({
    query: getLounge(loungeId as string),
  });

  return {
    props: {
      lounge: data?.lounge,
      loading: loading,
    },
  };
}

Book.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
