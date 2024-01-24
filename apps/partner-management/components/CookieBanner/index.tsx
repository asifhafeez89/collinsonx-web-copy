import {
  Box,
  Button,
  Flex,
  Text,
  Portal,
  Anchor,
} from '@collinsonx/design-system/core';
import { CONSENT } from 'config';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import classes from './CookieBanner.module.css';

const CookieBanner = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(localStorage.getItem(CONSENT) !== 'accept');
  }, []);
  const handleClickAccept = () => {
    localStorage.setItem(CONSENT, 'accept');
    setShow(false);
  };
  return show ? (
    <Portal>
      <Box className={classes.container}>
        <Flex
          h="100%"
          gap={{ base: 12, md: 48 }}
          align="center"
          justify="center"
          wrap="wrap"
        >
          <Text style={{ fontSize: 18 }}>
            This website uses cookies to ensure you get the best experience.{' '}
            <Anchor
              className={classes.learnMoreLink}
              component={Link}
              href="https://www.prioritypass.com/privacy-notice"
            >
              Learn more
            </Anchor>
          </Text>
          <Button
            className={classes.acceptBtn}
            onClick={handleClickAccept}
            px={32}
            fw={700}
          >
            Accept and close
          </Button>
        </Flex>
      </Box>
    </Portal>
  ) : null;
};

export default CookieBanner;
