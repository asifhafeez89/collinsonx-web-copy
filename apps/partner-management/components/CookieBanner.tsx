import { Button, Flex, Text, Portal } from '@collinsonx/design-system/core';
import styled from '@collinsonx/design-system/styled';
import { CONSENT } from 'config';
import { useEffect, useState } from 'react';

const Container = styled.div`
  height: 92px;
  background-color: #f4f4f4;
  color: #000;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom: 0;
  width: 100%;

  /* freshchat widget zIndex = 2147483600 */
  z-index: 2147483601;
`;
const CookieBanner = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(localStorage.getItem(CONSENT) === null);
  }, []);
  const handleClickAccept = () => {
    localStorage.setItem(CONSENT, 'accept');
    setShow(false);
  };
  const handleClickDecline = () => {
    localStorage.setItem(CONSENT, 'decline');
    setShow(false);
  };
  return show ? (
    <Portal>
      <Container>
        <Flex h="100%" gap={48} align="center" justify="center">
          <Text size={18}>
            This website uses cookies to ensure you get the best experience.
            Learn more
          </Text>
          <Flex gap={16}>
            <Button onClick={handleClickAccept}>Accept</Button>
            <Button onClick={handleClickDecline}>Decline</Button>
          </Flex>
        </Flex>
      </Container>
    </Portal>
  ) : null;
};

export default CookieBanner;
