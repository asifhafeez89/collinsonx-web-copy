import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import clsx from 'clsx';
import {
  PropsWithChildren,
  useEffect,
  useCallback,
  Children,
  useState,
} from 'react';
import { Box, Button } from '@collinsonx/design-system/core';
import CarouselControls from './CarouselControls/index';
import CarouselDots from './CarouselDots/index';
import { FitScreen } from '@collinsonx/design-system/assets/icons/index';
import classes from './Carousel.module.css';

export { default as CarouselSlide } from './CarouselSlide/index';

type CustomCarouselOptions = {
  activeIndex: number;
  activeImgUrl?: string | null;
  onSlideChange: (index: number) => void;
};

export type CarouselProps = PropsWithChildren<CustomCarouselOptions> &
  EmblaOptionsType;

export default function Carousel({
  activeIndex,
  activeImgUrl,
  onSlideChange,
  children,
  ...options
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, ...options });
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    onSlideChange(index);
  }, [emblaApi, onSlideChange]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', onSelect);
    }

    return () => {
      emblaApi?.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi && typeof activeIndex === 'number') {
      emblaApi.scrollTo(activeIndex);
    }
  }, [activeIndex, emblaApi]);

  const length = Children.count(children);
  const canScrollNext = !!emblaApi?.canScrollNext();
  const canScrollPrev = !!emblaApi?.canScrollPrev();

  return (
    <Box
      className={classes.embla}
      ref={emblaRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-roledescription="carousel"
      role="region"
    >
      <Box className={classes.emblaContainer}>{children}</Box>
      <Button
        className={clsx(classes.fullscreenButton, {
          [classes.hidden]: !isHovered && !isFocused,
        })}
        aria-label="Enlarge image"
        visibleFrom="sm"
      >
        <FitScreen />
      </Button>
      <CarouselDots itemsLength={length} selectedIndex={activeIndex} />
      <CarouselControls
        canScrollNext={canScrollNext}
        canScrollPrev={canScrollPrev}
        onNext={scrollNext}
        onPrev={scrollPrev}
        showControls={isHovered || isFocused}
      />
    </Box>
  );
}
