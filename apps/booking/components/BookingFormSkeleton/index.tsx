import { Box, Flex, Skeleton } from '@collinsonx/design-system/core';
import classes from './BookingFormSkeleton.module.css';

const BookingFormSkeleton = () => {
  return (
    <Box h="100%" w={375} m="auto">
      <Flex align="center" justify="center" w="100%">
        <Skeleton my={24} w={100} h={12}></Skeleton>
      </Flex>
      <Box w="100%" mb={24} className={classes.border} />
      <Box px={24} my={24}>
        <Flex gap={24} align="center">
          <Skeleton w={120} h={80} radius="sm" />
          <Skeleton w={150} h={12} radius="sm" />
        </Flex>

        <Skeleton mt={32} mb={24} w={200} h={12} radius="sm" />
        <Skeleton my={8} w={120} h={12} radius="sm" />

        <Skeleton mt={48} mb={24} w={200} h={12} radius="sm" />
        <Skeleton my={8} w={120} h={12} radius="sm" />
      </Box>

      <Box w="100%" my={48} className={classes.border} />

      <Box px={24} my={32}>
        <Skeleton mt={32} mb={24} w={200} h={12} radius="sm" />
        <Skeleton my={8} w={120} h={12} radius="sm" />

        <Skeleton mt={48} mb={24} w={200} h={12} radius="sm" />
        <Skeleton my={8} w={120} h={12} radius="sm" />
      </Box>

      <Box w="100%" my={48} className={classes.border} />
      <Box px={24} my={32}>
        <Skeleton my={24} w={200} h={12} radius="sm" />
        <Skeleton my={8} w={120} h={12} radius="sm" />
      </Box>
      <Skeleton m="auto" w="90%" h={41} />
    </Box>
  );
};

export default BookingFormSkeleton;
