import Layout from '@components/Layout';
import { BookingSuccess as BookingSuccessGraphic } from '@collinsonx/design-system/assets/graphics';
import { Flex, Text, Button } from '@collinsonx/design-system/core';
import Link from 'next/link';

export default function BookingSuccess() {
  return (
    <Flex mt={63} align="center" direction="column">
      <BookingSuccessGraphic />
      <Text mt={33} align="center" w={234}>
        The lounge will receive your request and send confirmation once they
        have reviewed availability.
      </Text>
      <Link href="/bookings">
        <Button variant="outline" mt={58}>
          View my bookings
        </Button>
      </Link>
    </Flex>
  );
}
BookingSuccess.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
