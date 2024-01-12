import React from 'react';
import { Image } from '@collinsonx/design-system/core';
import Carousel, { CarouselSlide } from '@components/Carousel';
import LayoutCatalogue from '@components/LayoutCatalogue';
import { Box } from '@collinsonx/design-system/core';

const images = [
  'https://placehold.co/480x300?font=roboto&text=Slide+1',
  'https://placehold.co/480x300?font=roboto&text=Slide+2',
  'https://placehold.co/480x300?font=roboto&text=Slide+3',
  'https://placehold.co/480x300?font=roboto&text=Slide+4',
];

export default function CarouselPage() {
  return (
    <Box mx="auto" my={2} w={500}>
      <Carousel loop>
        {images.map((src, i) => (
          <CarouselSlide>
            <Image src={src} />
          </CarouselSlide>
        ))}
      </Carousel>
    </Box>
  );
}

CarouselPage.getLayout = (page: JSX.Element) => (
  <LayoutCatalogue headerNavProps={{ section: 'catalogue' }}>
    {page}
  </LayoutCatalogue>
);
