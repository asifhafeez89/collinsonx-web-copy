import Layout from '../components/Layout';
import { BookingSuccess as BookingSuccessGraphic } from '@collinson/design-system/assets/graphics';
import { Button, Flex, Text } from '@collinson/design-system/core';
export default function BookingSuccess() {
  return (
    <Flex mt={63} align="center" direction="column">
      <BookingSuccessGraphic />
      <Text mt={33} align="center" w={234}>
        The lounge will receive your request and send confirmation once they
        have reviewed availability.
      </Text>
      <Button variant="outline" mt={58}>
        Back to lounge details
      </Button>
    </Flex>
  );
}
BookingSuccess.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
