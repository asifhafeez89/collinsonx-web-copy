import React, { useCallback, useMemo, useState } from 'react';
import { Box, Text, Image } from '@collinsonx/design-system/core';
import { Asset } from '@collinsonx/utils';
import classes from './OutletImages.module.css';
import ThumbnailList from '@components/ThumbnailList';
import Carousel, { CarouselSlide } from '@components/Carousel';
import EditableArea from '@components/EditableArea';
import Lightbox from '@components/Lightbox';

interface OutletImagesProps {
  mediaCollection?: (Asset | null)[];
}

type ImageAsset = Pick<Asset, 'url' | 'description' | 'title'>;

const OutletImages: React.FC<OutletImagesProps> = ({ mediaCollection }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<ImageAsset | undefined>();

  const images = useMemo<ImageAsset[]>(() => {
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

  const handleClickFull = useCallback(
    (index: number) => {
      const image = images[index];
      setLightboxImage(image);
    },
    [setLightboxImage, images]
  );
  const handleCloseLightbox = () => {
    setLightboxImage(undefined);
  };

  const lightboxImageComponent = useMemo(() => {
    if (lightboxImage !== undefined) {
      const { url, description, title } = lightboxImage;
      return <Image src={url} alt={description || title || 'Outlet image'} />;
    }
  }, [lightboxImage]);

  return (
    <EditableArea title="Images" subtitle="Last edited:">
      {images && images[activeIndex] && (
        <Box style={{ maxWidth: '550px', minWidth: '275px' }} mx="auto">
          <Carousel
            activeIndex={activeIndex}
            onClickFull={handleClickFull}
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
      <Lightbox
        opened={!!lightboxImage}
        onClose={handleCloseLightbox}
        title={lightboxImage?.title ?? undefined}
      >
        {lightboxImageComponent}
      </Lightbox>
    </EditableArea>
  );
};

export default OutletImages;
