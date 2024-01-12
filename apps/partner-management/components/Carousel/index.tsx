import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import {
  PropsWithChildren,
  useEffect,
  useCallback,
  useState,
  Children,
} from 'react';
import { Box } from '@collinsonx/design-system/core';
import classes from './Carousel.module.css';
import CarouselControls from './CarouselControls';
import CarouselDots from './CarouselDots';

export { default as CarouselSlide } from './CarouselSlide';

export type CarouselProps = PropsWithChildren & EmblaOptionsType;

export default function Carousel({ children, ...options }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, ...options });

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    function selectHandler() {
      const index = emblaApi?.selectedScrollSnap();
      setSelectedIndex(index || 0);
    }
    emblaApi?.on('select', selectHandler);

    return () => {
      emblaApi?.off('select', selectHandler);
    };
  }, [emblaApi]);

  // support for imperative actions
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const length = Children.count(children);
  const canScrollNext = !!emblaApi?.canScrollNext();
  const canScrollPrev = !!emblaApi?.canScrollPrev();

  return (
    <Box className={classes.embla} ref={emblaRef}>
      <Box className={classes.emblaContainer}>{children}</Box>
      <CarouselDots itemsLength={length} selectedIndex={selectedIndex} />
      <CarouselControls
        canScrollNext={canScrollNext}
        canScrollPrev={canScrollPrev}
        onNext={() => emblaApi?.scrollNext()}
        onPrev={() => emblaApi?.scrollPrev()}
      />
    </Box>
  );
}
