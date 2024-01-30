import { LogoCollinson } from '@collinsonx/design-system/assets/logo';
import Title from '@collinsonx/design-system/components/title';
import { Box, Flex } from '@collinsonx/design-system/core';

import classes from './HeaderHome.module.css';
import Section from '@components/Section';

const HeaderHome = () => {
  return (
    <Box className={classes.container}>
      <Section>
        <Flex
          justify="space-between"
          align="center"
          py={29}
          maw={1140}
          mx="auto"
        >
          <Title mb={8} size={48} data-testid="overviewTitle">
            Partner Portal
          </Title>
          <Box>
            <LogoCollinson />
          </Box>
        </Flex>
      </Section>
    </Box>
  );
};

export default HeaderHome;
