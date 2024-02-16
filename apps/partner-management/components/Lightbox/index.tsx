import { ReactNode } from 'react';
import {
  ActionIcon,
  Box,
  CloseIcon,
  Flex,
  Modal,
  Text,
} from '@collinsonx/design-system/core';

import classes from './Lightbox.module.css';

interface LightboxProps {
  children: ReactNode;
  opened: boolean;
  title?: string;
  subtitle?: string;
  onClose: () => void;
}
const Lightbox = ({
  children,
  opened,
  onClose,
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
          <Box className={classes.modalBodyInner}>{children}</Box>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default Lightbox;
