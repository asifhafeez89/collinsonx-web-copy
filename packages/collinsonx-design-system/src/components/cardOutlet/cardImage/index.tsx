import styled from '@emotion/styled';
import { Status } from '../index';
import {
  Box,
  BoxProps,
  Tooltip,
  createPolymorphicComponent,
} from '@mantine/core';
import colors from '../../../colour-constants-partner';

export interface CardImageProps {
  src: string;
  status: Status;
  imageCount?: number;
}

const Container = styled.div`
    width: 100%;
    height: 160px;
    ${({ src, status }: CardImageProps) => `
        background-image: url("${src}");
        ${status === Status.Inactive ? `filter: grayscale(100%);` : ''}
    
    `}
    position: relative;
    background-size: 100%;
    background-repeat: no-repeat;
    transition: background-size 0.3s ease-in-out;
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
    <Container
      role="img"
      className="outlet-image"
      aria-label="Outlet image"
      {...props}
    >
      {imageCount && (
        <Tooltip
          label="Images"
          position="bottom"
          arrowPosition="center"
          arrowSize={6}
          withinPortal
          withArrow
        >
          <ImageCount>{imageCount}</ImageCount>
        </Tooltip>
      )}
    </Container>
  );
};

export default CardImage;
