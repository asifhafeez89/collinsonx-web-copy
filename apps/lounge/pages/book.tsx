
import {  Stack, Flex , Paper} from '@collinson/design-system/core';
import Layout from '../components/Layout';

import {InputLabel, InputSelect, InputTextArea, Button, PageTitle, Lounge} from '@collinson/design-system';
import { Clock, Calendar } from '@collinson/design-system/assets/icons';
import { useRouter } from 'next/router';

export default function Landing() {
  const router = useRouter();
  
  const handleBook = () => {
    router.push('/confirm')
  }

  const data = {
    location: 'London',
    airport: 'Heathrow T5',
    openingTimes: '07:00 - 22:00',
    openDays: 'Monday - Sunday',
  };
  

  return (
    <>
      <Stack sx={{ position: 'relative' }}>
        <PageTitle title={'Club Aspire Lounge'} url={'/lounge/details'} />
        <Lounge {...data} />
        <Flex direction="column">
          <Paper  mt={30} radius="md">
            <InputLabel 
              placeholder="dd/mm/yyyy"
              label="Date"
              withAsterisk 
              icon={<Calendar size={14} />}
            />
          </Paper>
          <Paper  mt={30} radius="md">
            <InputSelect
              label="Time of arrival"
              withAsterisk 
              description="Please check lounge conditions for access times"
              icon={<Clock size={14} />}
              data={['00:00', '01:00',  '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
              '13:00', '14:00',  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
            ]}
            />
          </Paper>
          <Paper mt={30} radius="md">
            <InputTextArea
               placeholder="Your comment"
               label="Your comment"
               withAsterisk
               minRows={3}
            />
          </Paper>
          <Paper mt={30} radius="md">
            <Button
              handleClick={handleBook}
              variant="filled"
              icon={null}
              fullWidth
              color="light"
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
            </Button>
          </Paper>
        </Flex>
      </Stack>
    </>
  );
}

Landing.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
