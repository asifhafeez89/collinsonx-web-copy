import styled from '@emotion/styled';
import { Status } from '@collinsonx/utils';

import { Box, Tooltip, rgba } from '@mantine/core';
import colors from '../../../colour-constants-partner';

export interface CardImageProps {
  src?: string;
  status: Status;
  imageCount?: number;
  alt?: string;
  hasPadding?: boolean;
}

const Container = styled.div`
    width: 100%;
    height: 160px;
    ${({ src, status }: CardImageProps) => `
        ${src ? `background-image: url("${src}");` : ''}
        ${status === Status.Inactive ? `filter: grayscale(100%);` : ''}
    
    `}
    background-color: ${colors['grey-border']};
    position: relative;
    background-size: ${({ hasPadding }: CardImageProps) => `
      ${hasPadding ? 'cover' : '100%'};
    `}

    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.3s ease-in-out;
  }
`;

const ImageCount = styled.div`
  border-radius: 8px;
  padding: 4px 8px 4px 8px;
  color: ${colors['text-default']};
  background-color: ${rgba('#FFF', 0.7)};
  font-size: 16px;
  position: absolute;
  bottom: 8px;
  right: 8px;
  min-width: 33px;
  height: 33px;
  display: flex;
  justify-content: center;
`;

const CardImage = (props: CardImageProps) => {
  const { imageCount, alt, hasPadding } = props;
  const tooltip = imageCount && (
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
  );
  const image = (
    <Container role="img" className="card-image" aria-label={alt} {...props}>
      {tooltip}
    </Container>
  );
  return hasPadding ? (
    <Box p={24} style={{ borderBottom: `1px solid ${colors['grey-border']}` }}>
      {image}
    </Box>
  ) : (
    image
  );
};

export default CardImage;
