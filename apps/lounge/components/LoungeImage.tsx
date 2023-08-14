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
  withControls?: boolean;
  withIndicators?: boolean;
  overlay?: boolean;
  indicatorBottom?: number | string;
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

const LoungeImage = ({
  images,
  width,
  height,
  withControls = false,
  withIndicators = false,
  indicatorBottom = '1rem',
  overlay = false,
}: LoungeImageProps) => {
  const { classes } = useStyles();

  if (images && images.length > 1) {
    return (
      <Carousel
        classNames={classes}
        withControls={withControls}
        withIndicators={withIndicators}
        styles={{
          indicators: {
            bottom: indicatorBottom,
          },
        }}
      >
        {images.map((img, index) => (
          <Carousel.Slide mah={height} key={img?.id ?? index}>
            <Box sx={overlay ? { background: '#25262B' } : {}}>
              <NextImage
                placeholder="blur"
                blurDataURL={rgbDataURL(222, 226, 230)}
                alt={img?.altText ?? ''}
                src={img?.url!}
                height={height}
                width={width}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: overlay ? 0.5 : 1,
                }}
              />
            </Box>
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
        height={height}
        width={width}
        style={{ objectFit: 'cover' }}
      />
    );
  }
  return (
    <Box
      sx={{
        backgroundColor: '#dee2e6',
        width,
        height,
      }}
    />
  );
};

export default LoungeImage;
