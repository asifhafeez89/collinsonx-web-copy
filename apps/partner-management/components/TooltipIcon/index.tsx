import {
  ActionIcon,
  MantineColor,
  Tooltip,
  MantineSize,
} from '@collinsonx/design-system/core';
import React from 'react';

interface TooltipIconProps {
  icon: React.ReactNode;
  tooltipText: string;
  color?: MantineColor;
  size?: MantineSize;
  tooltipProps?: Omit<
    React.ComponentProps<typeof Tooltip>,
    'label' | 'children'
  >;
  iconProps?: React.ComponentProps<typeof ActionIcon>;
}

const TooltipIcon = ({
  icon,
  tooltipText,
  color = 'gray',
  size = 'md',
  tooltipProps,
  iconProps,
}: TooltipIconProps) => {
  return (
    <Tooltip label={tooltipText} withArrow position="right" {...tooltipProps}>
      <ActionIcon variant="subtle" color={color} size={size} {...iconProps}>
        {icon}
      </ActionIcon>
    </Tooltip>
  );
};

export default TooltipIcon;
