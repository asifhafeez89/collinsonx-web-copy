import React from 'react';
import styled from '@collinsonx/utils/styled';
import Button from '../button';

const CardWrapper = styled.div`
  width: 100%;
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  border: 1px solid #e9ecef;
  padding: 1rem;
  margin-bottom: 1rem;

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
`;

interface CardProps {
  title: String;
  subtitle: String;
  pictureUrl: string;
  handleClick: () => void;
}

/**
 * Primary UI component for user interaction
 */
export default function Card({
  title,
  subtitle,
  pictureUrl,
  handleClick,
  ...props
}: CardProps) {
  return (
    <CardWrapper>
      <img src={pictureUrl} alt="Avatar" style={{ width: '100%' }} />
      <ContentWrapper>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </ContentWrapper>
      <div>
        <Button
          variant="outline"
          color="dark"
          fullWidth={true}
          handleClick={handleClick}
          icon={null}
        >
          Book Lounge
        </Button>
      </div>
    </CardWrapper>
  );
}
