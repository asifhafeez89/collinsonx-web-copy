import { Modal, Grid } from '@mantine/core';
import Button from '../button';
import colors from '../../colour-constants-baas';
import styles from './lightbox.module.css';

interface LightboxProps {
  children: JSX.Element;
  title: String;
  open: boolean;
  ctaCancel: String;
  ctaForward: String;
  cancelModal?: boolean;
  ctaForwardCall: () => void;
  onClose: () => void;
}

function Lightbox({
  children,
  title,
  open,
  ctaCancel,
  ctaForward,
  ctaForwardCall,
  onClose,
  cancelModal,
}: LightboxProps) {
  return (
    <>
      <Modal
        opened={open}
        onClose={onClose}
        title={title}
        withCloseButton={false}
        centered
      >
        <div>
          {children}
          <Grid justify="flex-end">
            <Grid.Col span={{ sm: 6, xs: 12 }}>
              {cancelModal ? (
                <Button
                  py={8}
                  variant="outline"
                  handleClick={onClose}
                  align="center"
                  classNames={{
                    root: styles.buttonHover,
                  }}
                  styles={{
                    root: {
                      border: 'solid',
                      width: '100%',
                      backgroundColor: 'transparent',
                      borderWidth: 2,
                      borderColor: colors.buttonBlack,
                      color: colors.buttonBlack,
                    },
                    label: {
                      color: colors.buttonBlack,
                    },
                  }}
                >
                  {ctaCancel}
                </Button>
              ) : (
                <Button handleClick={onClose} variant="white">
                  {ctaCancel}
                </Button>
              )}
            </Grid.Col>
            <Grid.Col span={{ sm: 6, xs: 12 }}>
              {cancelModal ? (
                <Button
                  py={8}
                  variant="outline"
                  handleClick={ctaForwardCall}
                  align="center"
                  classNames={{
                    root: styles.buttonHover,
                  }}
                  styles={{
                    root: {
                      border: 'solid',
                      backgroundColor: 'transparent',
                      borderWidth: 2,
                      width: '100%',
                      borderColor: colors.red,
                      color: colors.red,
                    },
                    label: {
                      color: colors.red,
                    },
                  }}
                >
                  {ctaForward}
                </Button>
              ) : (
                <Button handleClick={ctaForwardCall} variant="white">
                  {ctaForward}
                </Button>
              )}
            </Grid.Col>
          </Grid>
        </div>
      </Modal>
    </>
  );
}

export default Lightbox;
