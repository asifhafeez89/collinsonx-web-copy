import {
  Stack,
  Flex,
  Paper,
} from '@collinson/design-system/core';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

import {
  FieldLabel,
  Button,
  PageTitle,
  Lounge,
} from '@collinson/design-system';

export default function Landing() {
  const router = useRouter();

  const handleConfirm = () => {
    router.push('/success')
  };
  
  const data = {
    location: 'London',
    airport: 'Heathrow T5',
    details:
      'The lounge will receive your request and send confirmation once they have reviewed availability.',
    openingTimes: '07:00 - 22:00',
    openDays: 'Monday - Sunday',
  };

  return (
    <>
      <Stack sx={{ position: 'relative' }}>
        <PageTitle title={'Club Aspire Lounge'} url={'/lounge/book'} />
        <Lounge {...data} />
        <Flex direction="column">
          <Paper mt={30} radius="md">
            <FieldLabel
              title="Date"
              value="12/6/2023"
              handleClick={() => router.push('/book')}
            />
          </Paper>
          <Paper mt={30} radius="md">
            <FieldLabel
              title="Time of arrival"
              value="08:30"
              handleClick={() => router.push('/book')}
            />
          </Paper>
          <Paper mt={30} radius="md">
            <FieldLabel
              title="Additional requirements"
              value="None"
              handleClick={() => router.push('/book')}
            />
          </Paper>
          <Button
            handleClick={handleConfirm}
            variant="filled"
            icon={null}
            fullWidth
            color="dark"
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
        </Flex>
      </Stack>
    </>
  );
}

Landing.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
