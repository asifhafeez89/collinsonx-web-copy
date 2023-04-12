import { Image, Maybe } from '@collinsonx/utils/generatedTypes/graphql';
import { Carousel } from '@collinsonx/design-system/carousel';
import { getStylesRef, createStyles } from '@collinsonx/design-system/core';

export interface LoungeImageProps {
  images?: Maybe<Maybe<Image>[]>;
  width: number;
  height: number;
}

const useStyles = createStyles(() => ({
  controls: {
    ref: getStylesRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },
  control: {
    '&[data-inactive]': {
      opacity: 0,
      cursor: 'default',
    },
  },

  root: {
    '&:hover': {
      [`& .${getStylesRef('controls')}`]: {
        opacity: 1,
      },
    },
  },
}));

const LoungeImage = ({ images, width, height }: LoungeImageProps) => {
  const { classes } = useStyles();

  if (images && images.length > 1) {
    return (
      <Carousel classNames={classes}>
        {images.map((img, index) => (
          <Carousel.Slide mah={127} key={img?.id ?? index}>
            <img
              alt={img?.altText ?? ''}
              src={img?.url!}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    );
  }
  if (images && images.length === 1) {
    return images.map((img, index) => (
      <img
        key={img?.id ?? index}
        alt={img?.altText ?? ''}
        src={img?.url!}
        style={{ width: '100%' }}
      />
    ));
  }
  return <></>;
};

export default LoungeImage;
