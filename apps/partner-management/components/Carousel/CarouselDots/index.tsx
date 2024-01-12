import { Box } from '@collinsonx/design-system/core';
import clsx from 'clsx';

import classes from './CarouselDots.module.css';

type Props = {
  itemsLength: number;
  selectedIndex: number;
};
const CarouselDots = ({ itemsLength, selectedIndex }: Props) => {
  const arr = new Array(itemsLength).fill(0);
  return (
    <Box className={classes.container}>
      {arr.map((_, index) => {
        const selected = index === selectedIndex;
        return (
          <Box
            className={clsx([
              classes.dot,
              {
                [classes.unselected]: !selected,
              },
            ])}
            key={index}
          ></Box>
        );
      })}
    </Box>
  );
};
export default CarouselDots;
