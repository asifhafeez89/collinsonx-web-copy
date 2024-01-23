import { Box } from '@collinsonx/design-system/core';
import clsx from 'clsx';

import classes from './CarouselDots.module.css';

type CarouselDotsProps = {
  itemsLength: number;
  selectedIndex: number;
};

const CarouselDots = ({ itemsLength, selectedIndex }: CarouselDotsProps) => {
  const arr = new Array(itemsLength).fill(0);

  return (
    <Box className={classes.container} aria-hidden="true">
      {arr.map((_, index) => {
        const active = index === selectedIndex;
        return (
          <Box
            className={clsx([
              classes.dot,
              {
                [classes.active]: active,
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
