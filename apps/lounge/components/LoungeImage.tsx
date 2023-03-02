import NextImage from 'next/image';
import { Image, Maybe } from '@collinsonx/utils/generatedTypes/graphql';

export interface LoungeImageProps {
  images?: Maybe<Maybe<Image>[]>;
  width: number;
  height: number;
}
const LoungeImage = ({ images, width, height }: LoungeImageProps) => {
  if (images && images.length) {
    if (images[0] !== null) {
      const { url, altText } = images[0];
      if (url) {
        return (
          <NextImage
            src={url}
            height={height}
            width={width}
            alt={altText || 'Image'}
          />
        );
      }
    }
  }
  return (
    <NextImage
      src="https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg"
      height={height}
      width={width}
      alt="Default image"
    />
  );
};

export default LoungeImage;
