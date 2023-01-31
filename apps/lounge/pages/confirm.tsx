
import { Title, Stack, Flex, Paper } from '@collinson/design-system/core';
import Layout from '../components/Layout';

import {FieldLabel, Button} from '@collinson/design-system';

export default function Landing() {

  const handleBook = () => {

  }

  return (
    <>
      <Stack sx={{ position: 'relative' }}>
        <Stack>
          <Title order={1} size={20} align="center">
            Ready for your next experience?
          </Title>
        </Stack>
        <Flex direction="column">

        <Paper   mt={30} radius="md">
         <FieldLabel
            title= 'Date'
            value= '12/6/2023'
            handleClick={() => console.log("Hello")}
         />
        </Paper>
        <Paper  mt={30} radius="md">
        <FieldLabel
            title= 'Date'
            value= '12/6/2023'
            handleClick={() => console.log("Hello")}
         />
        </Paper>
        <Paper mt={30} radius="md">
        <FieldLabel
            title= 'Date'
            value= '12/6/2023'
            handleClick={() => console.log("Hello")}
         />
        </Paper>

          <Button
            handleClick={handleBook}
            variant="filled"
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
