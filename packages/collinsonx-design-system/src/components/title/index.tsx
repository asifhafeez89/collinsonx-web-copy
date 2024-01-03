import {
  Title as MantineTitle,
  TitleProps as MantineTitleProps,
} from '@mantine/core';

import classes from 'assets/components/title.module.css';

const Title = (props: MantineTitleProps) => {
  const order = props.order || 1;
  return (
    <MantineTitle
      {...props}
      style={{
        ...props.style,
      }}
      className={classes[`title-${order}`]}
    />
  );
};

export default Title;
