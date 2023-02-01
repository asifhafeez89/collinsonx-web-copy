import Layout from '../components/Layout';
import { BookingSuccess as BookingSuccessGraphic } from '@collinson/design-system/assets/graphics';
import { Flex, Text } from '@collinson/design-system/core';
import { Button } from '@collinson/design-system';
import { useRouter } from 'next/router';

export default function BookingSuccess() {
  const router = useRouter();
  const backToLounges = () => {
    router.push('/');
  };

  return (
    <Flex mt={63} align="center" direction="column">
      <BookingSuccessGraphic />
      <Text mt={33} align="center" w={234}>
        The lounge will receive your request and send confirmation once they
        have reviewed availability.
      </Text>
      <Button variant="outline" mt={58} handleClick={backToLounges}>
        Back to lounge details
      </Button>
    </Flex>
  );
}
BookingSuccess.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
