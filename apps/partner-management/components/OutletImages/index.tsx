import React, { useMemo, useState } from 'react';
import {
  Group,
  Box,
  Title,
  Text,
  Stack,
  Image,
  Flex,
} from '@collinsonx/design-system/core';
import { Asset } from '@collinsonx/utils';
import classes from './OutletImages.module.css';
import { Button } from '@collinsonx/design-system';
import ThumbnailList from '@components/ThumbnailList';
import Carousel, { CarouselSlide } from '@components/Carousel';
import EditableArea from '@components/EditableArea';

interface OutletImagesProps {
  mediaCollection?: (Asset | null)[];
}

const OutletImages: React.FC<OutletImagesProps> = ({ mediaCollection }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = useMemo(() => {
    return (
      mediaCollection
        ?.filter((media): media is Asset => media !== null)
        .map((media) => ({
          url: media.url,
          description: media.description,
          title: media.title,
        })) || []
    );
  }, [mediaCollection]);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  const numImages = images.length;

  const imageCountText = `${numImages} ${numImages === 1 ? 'image' : 'images'}`;

  const slides = useMemo(() => {
    return images.map((image, index) => (
      <CarouselSlide
        key={image.url}
        slideIndex={index + 1}
        numSlides={numImages}
      >
        <Image
          src={image.url}
          alt={image.description || image.title || 'Outlet image'}
          className={classes.carouselImage}
        />
      </CarouselSlide>
    ));
  }, [images, numImages]);

  return (
    <EditableArea title="Images" subtitle="Last edited:">
      {images && images[activeIndex] && (
        <Box style={{ maxWidth: '550px', minWidth: 'min-content' }} mx="auto">
          <Carousel
            activeIndex={activeIndex}
            onSlideChange={setActiveIndex}
            activeImgUrl={images[activeIndex].url}
          >
            {slides}
          </Carousel>
          <ThumbnailList
            thumbnails={images}
            onThumbnailClick={handleThumbnailClick}
            activeIndex={activeIndex}
          />

          <Text>{imageCountText}</Text>
        </Box>
      )}
    </EditableArea>
  );
};

export default OutletImages;
