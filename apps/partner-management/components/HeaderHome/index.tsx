import { LogoCollinson } from '@collinsonx/design-system/assets/logo';
import { Title } from '@collinsonx/design-system/core';
import { Box, Flex } from '@collinsonx/design-system/core';

import classes from './HeaderHome.module.css';
import Section from '@components/Section';

const HeaderHome = () => {
  return (
    <Box className={classes.container}>
      <Section>
        <Flex
          justify="space-between"
          wrap="wrap"
          align="center"
          gap={32}
          rowGap={32}
          py={29}
          maw={1140}
          mx="auto"
        >
          <Title className={classes.title} data-testid="overviewTitle">
            Partner Portal
          </Title>
          <LogoCollinson />
        </Flex>
      </Section>
    </Box>
  );
};

export default HeaderHome;
