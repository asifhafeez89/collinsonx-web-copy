import {
  Stack,
  Flex,
  Paper,
  UnstyledButton,
} from '@collinsonx/design-system/core';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

import {
  FieldLabel,
  Button,
  PageTitle,
  Lounge,
} from '@collinsonx/design-system';
import { LoungeType } from 'lounges';

export default function Landing() {
  const router = useRouter();
  const lounge = router?.query?.lounge ?? '{}';
  const loungeDetails: LoungeType = JSON.parse(lounge as string);

  const handleConfirm = () => {
    router.push('/success');
  };

  return (
    <Stack sx={{ position: 'relative' }}>
      <PageTitle title={'Confirm details'} url={'/lounge/book'} />
      <Lounge
        airport={loungeDetails.airport}
        terminal={loungeDetails.terminal}
      />
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
        <UnstyledButton
          onClick={handleConfirm}
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
          Send booking to lounge
        </UnstyledButton>
      </Flex>
    </Stack>
  );
}

Landing.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
