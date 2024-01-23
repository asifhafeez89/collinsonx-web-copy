import { Box, Text } from '@collinsonx/design-system/core';
import classes from './Popover.module.css';

type PopoverProps = {
  title: string;
  body: string;
};

const Popover = ({ title, body }: PopoverProps) => (
  <Box className={classes.container}>
    <Text className={classes.title}>{title}</Text>
    <Text className={classes.body}>{body}</Text>
  </Box>
);

export default Popover;
