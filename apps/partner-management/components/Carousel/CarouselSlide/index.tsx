import { ActionIcon, Box, Tooltip } from '@collinsonx/design-system/core';
import { FC, PropsWithChildren } from 'react';

import { WarningAmber } from '@collinsonx/design-system/assets/icons';
import colors from '@collinsonx/design-system/colour-constants-partner';
import Popover from '@components/Popover';
import classes from './CarouselSlide.module.css';

type SlideProps = {
  slideIndex: number;
  numSlides: number;
  warning?: string;
};

const Slide: FC<PropsWithChildren<SlideProps>> = ({
  children,
  slideIndex,
  numSlides,
  warning,
}) => {
  return (
    <Box
      className={classes.emblaSlide}
      aria-description="slide"
      aria-label={`${slideIndex} of ${numSlides}`}
    >
      {warning && (
        <Tooltip
          label={<Popover title="Warning" body={warning} />}
          position="bottom"
          withArrow
          multiline
          w={260}
          classNames={{
            tooltip: classes.warningTooltip,
            arrow: classes.warningTooltipArrow,
          }}
        >
          <ActionIcon className={classes.warningIcon} aria-label="Warning">
            <WarningAmber color={colors['text-default']} />
          </ActionIcon>
        </Tooltip>
      )}
      {children}
    </Box>
  );
};

export default Slide;
