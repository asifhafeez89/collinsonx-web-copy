
import { Title, Stack, Flex } from '@collinson/design-system/core';
import Layout from '../components/Layout';

import {InputLabel, InputSelect, InputTextArea, Button} from '@collinson/design-system';
import { Clock } from '@collinson/design-system/assets/icons';

export default function Landing() {

  const handleBook = () => {

  }

  return (
    <>
      <Stack align="center" sx={{ position: 'relative' }}>
        <Stack spacing={24} align="center">
          <Title order={1} size={20} align="center">
            Ready for your next experience?
          </Title>
        </Stack>
        <Flex direction="column">

            <InputLabel 
              placeholder="dd/mm/yyyy"
              label="Date"
              withAsterisk 
              icon={<Clock size={14} />}
            />

            <InputSelect
              label="Time of arrival"
              withAsterisk 
              description="Please check lounge conditions for access times"
              icon={<Clock size={14} />}
              data={['00:00', '01:00',  '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
              '13:00', '14:00',  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
            ]}
            />

            <InputTextArea
               placeholder="Your comment"
               label="Your comment"
               withAsterisk
            />

          <Button
            handleClick={handleBook}
            variant="outline"
            icon={null}
            fullWidth
            color="dark"
          >
            Confirm details
          </Button>




        </Flex>
      </Stack>
    </>
  );
}

Landing.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
