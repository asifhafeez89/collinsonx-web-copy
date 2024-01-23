import React, { useMemo, useState } from 'react';
import {
  Group,
  Box,
  Title,
  Text,
  Stack,
  Image,
} from '@collinsonx/design-system/core';
import { Asset } from '@collinsonx/utils';
import classes from './OutletImages.module.css';
import { Button } from '@collinsonx/design-system';
import ThumbnailList from '@components/ThumbnailList';
import Carousel, { CarouselSlide } from '@components/Carousel';

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

  return (
    <Box px="md">
      <Group justify="space-between" align="baseline" gap="sm" mb={12}>
        <Stack gap="xs">
          <Title className={classes.title} order={2}>
            Images
          </Title>
          <Text className={classes.subtitle}>Last edited:</Text>
        </Stack>
        <Button variant="outline" size="md" aria-label="Edit images">
          Edit
        </Button>
      </Group>

      <Carousel
        activeIndex={activeIndex}
        onSlideChange={setActiveIndex}
        activeImgUrl={images[activeIndex].url}
      >
        {images.map((image, index) => (
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
        ))}
      </Carousel>

      <ThumbnailList
        thumbnails={images}
        onThumbnailClick={handleThumbnailClick}
        activeIndex={activeIndex}
      />

      <Text>{imageCountText}</Text>
    </Box>
  );
};

export default OutletImages;
