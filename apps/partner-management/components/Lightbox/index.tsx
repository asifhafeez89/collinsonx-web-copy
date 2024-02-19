import { KeyboardEvent, ReactNode } from 'react';
import {
  ActionIcon,
  Box,
  CloseIcon,
  Flex,
  Modal,
  Text,
} from '@collinsonx/design-system/core';

import classes from './Lightbox.module.css';

export interface LightboxProps {
  children: ReactNode;
  opened: boolean;
  title?: string;
  subtitle?: string;
  leftSide?: JSX.Element;
  rightSide?: JSX.Element;
  onKeyDown?: (e: KeyboardEvent) => void;
  onClose: () => void;
}
const Lightbox = ({
  children,
  opened,
  onClose,
  leftSide,
  rightSide,
  onKeyDown,
  title,
  subtitle,
}: LightboxProps) => {
  return (
    <Modal.Root
      opened={opened}
      onClose={onClose}
      fullScreen
      withinPortal
      zIndex={9999}
      onKeyDown={onKeyDown}
    >
      <Modal.Content className={classes.modalContent}>
        <Modal.Header className={classes.modalHeader}>
          <Flex
            direction="column"
            align="center"
            rowGap={4}
            className={classes.modalHeaderContent}
          >
            {title && (
              <Modal.Title className={classes.modalTitle}>{title}</Modal.Title>
            )}
            {subtitle && <Text component="p">{subtitle}</Text>}
          </Flex>
          <ActionIcon
            aria-label="Close modal"
            variant="transparent"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </ActionIcon>
        </Modal.Header>
        <Modal.Body className={classes.modalBody}>
          <Box className={classes.modalBodyControlsContainer}>
            {!!leftSide && leftSide}
            <Box className={classes.modalBodyInner}>{children}</Box>
            {!!rightSide && rightSide}
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default Lightbox;
