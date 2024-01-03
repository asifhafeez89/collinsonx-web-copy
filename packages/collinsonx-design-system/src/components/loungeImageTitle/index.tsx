import styled from '@emotion/styled';
import { Flex, Image } from '@mantine/core';

interface LoungeImageTitleProps {
  title: string;
  image: string;
  location: string;
  price: string;
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
  location,
  price,
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
          style={{
            alignItems: 'center',
          }}
        >
          <Flex direction="column">
            <h2
              style={{
                fontSize: '12px',
                padding: '0',
                margin: '0',
              }}
            >
              {title}
            </h2>
            <strong>{location}</strong>
            <strong>{price}</strong>
          </Flex>
        </Flex>
      </Flex>
    </ContentWrapper>
  );
}
