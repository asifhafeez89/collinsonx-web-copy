import clsx from 'clsx';
import classes from './CarouselControls.module.css';
import { Box, Button } from '@collinsonx/design-system/core';
import {
  ChevronLeft,
  ChevronRight,
} from '@collinsonx/design-system/assets/icons';
import colors from '@collinsonx/design-system/colour-constants-partner';

type Props = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev(): void;
  onNext(): void;
  showControls: boolean;
};
const CarouselControls = (props: Props) => {
  const { canScrollNext, canScrollPrev, showControls, onNext, onPrev } = props;

  return (
    <Box
      className={clsx(classes.container, { [classes.hidden]: !showControls })}
      visibleFrom="sm"
    >
      <Button
        onClick={onPrev}
        disabled={!canScrollPrev}
        className={classes.buttonPrev}
        aria-label="Previous image"
      >
        <ChevronLeft color={colors['text-default']} />
      </Button>
      <Button
        onClick={onNext}
        disabled={!canScrollNext}
        className={classes.buttonNext}
        aria-label="Next image"
      >
        <ChevronRight color={colors['text-default']} />
      </Button>
    </Box>
  );
};
export default CarouselControls;
