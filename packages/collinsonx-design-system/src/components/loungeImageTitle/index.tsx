import styled from '@emotion/styled';
import { Flex, Image } from '@mantine/core';

interface LoungeImageTitleProps {
  title: string;
  image: string;
}

const ContentWrapper = styled.div`
  background: #fff;
`;

/**
 * Primary UI component for user interaction
 */
export default function LoungeImageTitle({
  title,
  image,
}: LoungeImageTitleProps) {
  return (
    <ContentWrapper>
      <Flex direction="row" gap={24}>
        {image && (
          <Image width={120} height={80} src={image} alt={title} radius="sm" />
        )}
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
          sx={{
            alignItems: 'center',
          }}
        >
          <strong>{title}</strong>
        </Flex>
      </Flex>
    </ContentWrapper>
  );
}
