import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import { Flex } from '@collinsonx/design-system/core';

const Spinner = () => (
  <Flex
    data-testid="spinner"
    justify="center"
    align="center"
    h="100%"
    w="100%"
    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
  >
    <LoaderLifestyleX />
  </Flex>
);

export default Spinner;
