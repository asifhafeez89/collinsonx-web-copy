import clsx from 'clsx';
import classes from './CarouselControls.module.css';
import { Box, Button } from '@collinsonx/design-system/core';

type Props = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev(): void;
  onNext(): void;
};
const CarouselControls = (props: Props) => {
  return (
    <Box className={classes.container}>
      <Button
        onClick={() => {
          if (props.canScrollPrev) {
            props.onPrev();
          }
        }}
        disabled={!props.canScrollPrev}
        className={classes.buttonPrev}
      >
        Prev
      </Button>
      <Button
        onClick={() => {
          if (props.canScrollNext) {
            props.onNext();
          }
        }}
        disabled={!props.canScrollNext}
        className={classes.buttonNext}
      >
        Next
      </Button>
    </Box>
  );
};
export default CarouselControls;
