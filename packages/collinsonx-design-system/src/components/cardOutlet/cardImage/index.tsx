import styled from '@emotion/styled';
import { Status } from '../index';
import { Box, BoxProps, createPolymorphicComponent } from '@mantine/core';
import colors from '../../../colour-constants-partner';

export interface CardImageProps {
  src: string;
  status: Status;
  imageCount?: number;
}

const Container = styled.div`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    width: 100%;
    height: 160px;
    ${({ src, status }: CardImageProps) => `
        background: url("${src}");
        ${status === Status.Inactive ? `filter: grayscale(100%);` : ''}
    
    `}
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

const _ImageCount = styled(Box)`
  background-color: ${colors['partner-grey-border']};
  border-radius: 8px;
  padding: 4px 8px 4px 8px;
  color: ${colors['partner-text-default']};
  opacity: 0.7;
  font-size: 16px;
  position: absolute;
  bottom: 8px;
  right: 8px;
  min-width: 33px;
  height: 33px;
  display: flex;
  justify-content: center;
`;

const ImageCount: React.FC<BoxProps> = createPolymorphicComponent<
  'div',
  BoxProps
>(_ImageCount);

const CardImage = (props: CardImageProps) => {
  const { imageCount } = props;
  return (
    <Container role="img" aria-label="Lounge image" {...props}>
      {imageCount && (
        <ImageCount arial-label="Number of lounge images">
          {imageCount}
        </ImageCount>
      )}
    </Container>
  );
};

export default CardImage;
