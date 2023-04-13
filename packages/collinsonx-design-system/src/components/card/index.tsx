import styled from '@emotion/styled';
import Button from '../button';
import { Flex, Stack, Text } from '@mantine/core';
import { Clock, MapPin } from '../../assets/icons';

const CardWrapper = styled.div`
  width: 100%;
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;

  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);

  h3 {
    padding-bottom: 0px;
    margin-bottom: 0px;
  }

  p {
    margin-top: 0px;
  }

  &:hover {
    box-shadow: 10 8px 16px 10 rgba(0, 0, 0, 0.2);
  }
`;

const ContentWrapper = styled.div`
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid #c8c9ca;
  padding-bottom: 16px;
  & h3 {
    margin-top: 8px;
  }
`;

interface CardProps {
  title: string;
  subtitle: string;
  ImageComponent?: JSX.Element;
  openingHours: string;
  handleClick: () => void;
}

/**
 * Primary UI component for user interaction
 */
export default function Card({
  title,
  subtitle,
  handleClick,
  ImageComponent,
  ...props
}: CardProps) {
  return (
    <CardWrapper>
      {ImageComponent}
      <ContentWrapper>
        <h3>{title}</h3>
      </ContentWrapper>
      <Stack spacing={8} py={16}>
        <Flex align="center" gap={10}>
          <MapPin width={16} color="#0C8599" />
          <Text fw={600}>{subtitle}</Text>
        </Flex>
        {/*<Flex align="center" gap={10}>
          <Clock width={16} color="#0C8599" />
          <Text fw={600}>{subtitle}</Text>
          </Flex>*/}
      </Stack>
      <div>
        <Button fullWidth={true} handleClick={handleClick} icon={null}>
          View Lounge
        </Button>
      </div>
    </CardWrapper>
  );
}
