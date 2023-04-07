import { LoaderLifestyleX as Loader } from '../../assets/graphics';
import { Box } from '@mantine/core';
import './index.css';

export default function LoaderLifestyleX() {
  return (
    <Box className="loader">
      <Loader />
    </Box>
  );
}
