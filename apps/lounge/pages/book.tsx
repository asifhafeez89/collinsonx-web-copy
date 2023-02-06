import {
  Stack,
  Flex,
  Paper,
  UnstyledButton,
} from '@collinsonx/design-system/core';
import Layout from '../components/Layout';
import { client } from '@collinsonx/utils/apollo';
import getLounge from '@collinsonx/utils/queries/getLounge';
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
import { ChangeEventHandler, useState } from 'react';

const HOURS = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];

function createTimeSlots() {
  const times: string[] = [];
  HOURS.forEach((item) => {
    times.push(`${item}:00`);
    times.push(`${item}:15`);
    times.push(`${item}:30`);
    times.push(`${item}:45`);
  });
  return times;
}

const timeSlots = createTimeSlots();

interface BookLoungeProps {
  lounge: LoungeData;
  loading: boolean;
}

export default function Book(props: BookLoungeProps) {
  const router = useRouter();
  const { lounge, loading } = props;
  const [reservationDate, setReservationDate] = useState<Date>();
  const [additionalRequests, setAdditionalRequests] = useState('');

  const onDateChange = (newDate: Date) => {
    if (reservationDate) {
      const d = reservationDate;
      d.setDate(newDate.getDate());
      d.setMonth(newDate.getMonth());
      d.setFullYear(newDate.getFullYear());
      setReservationDate(d);
    } else {
      setReservationDate(newDate);
    }
  };

  const onTimeChange = (newTime: string) => {
    const [hour, minutes] = newTime.split(':');
    let d = reservationDate ?? new Date();

    d.setHours(Number.parseInt(hour));
    d.setMinutes(Number.parseInt(minutes));
    setReservationDate(d);
  };

  const handleBook = () => {
    router.push({
      pathname: '/confirm',
      query: {
        id: lounge.id,
        reservationDate: JSON.stringify(reservationDate),
        additionalRequests,
      },
    });
  };

  const onAdditionalRequests = (e: any) => {
    setAdditionalRequests(e.target.value);
  };

  return (
    <>
      {loading && !lounge && <div>loading...</div>}
      {!loading && lounge && (
        <Stack sx={{ position: 'relative' }}>
          <PageTitle
            title={`Book ${lounge?.name}`}
            url={`/lounge/details?id=${lounge.id}`}
          />
          <Lounge
            airport={lounge?.location}
            loungeName={lounge?.name}
            openingTimes={lounge?.openingHours.substring(1, 20)}
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
                data={timeSlots}
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
                onChange={onAdditionalRequests}
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
