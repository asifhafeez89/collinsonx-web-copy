import NextImage from 'next/image';
import { Image, Maybe } from '@collinsonx/utils/generatedTypes/graphql';
import { Carousel } from '@collinsonx/design-system/carousel';
import {
  getStylesRef,
  createStyles,
  Box,
} from '@collinsonx/design-system/core';

export interface LoungeImageProps {
  images?: Maybe<Maybe<Image>[]>;
  width: number;
  height: number;
}

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

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

const LoungeImage = ({ images }: LoungeImageProps) => {
  const { classes } = useStyles();

  if (images && images.length > 1) {
    return (
      <Carousel classNames={classes}>
        {images.map((img, index) => (
          <Carousel.Slide mah={127} key={img?.id ?? index}>
            <NextImage
              placeholder="blur"
              blurDataURL={rgbDataURL(222, 226, 230)}
              alt={img?.altText ?? ''}
              src={img?.url!}
              height={126}
              width={295}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    );
  }
  if (images && images.length === 1) {
    const img = images[0];
    return (
      <NextImage
        key={img?.id ?? 'Image'}
        alt={img?.altText ?? ''}
        src={img?.url!}
        height={126}
        width={295}
        style={{ objectFit: 'cover' }}
      />
    );
  }
  return (
    <Box
      sx={{
        backgroundColor: '#dee2e6',
        width: 295,
        height: 126,
      }}
    />
  );
};

export default LoungeImage;
