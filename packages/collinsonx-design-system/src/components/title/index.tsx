import {
  Title as MantineTitle,
  TitleProps as MantineTitleProps,
  rem,
} from '@mantine/core';

const fontSizeXs = {
  1: 24,
  2: 20,
  3: 18,
};

const Title = (props: MantineTitleProps) => {
  const order = (props.order as keyof typeof fontSizeXs) || 1;
  const fontSize = fontSizeXs[order] ? rem(fontSizeXs[order]) : undefined;
  return (
    <MantineTitle
      {...props}
      sx={(theme) => ({
        ...props.sx,
        [theme.fn.smallerThan('sm')]: {
          fontSize,
        },
      })}
    />
  );
};

export default Title;
