import { Modal, Group, Grid } from '@mantine/core';
import Button from '../button';
import { ReactNode } from 'react';
import colors from '../../colour-constants';

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
            <Grid.Col sm={12} md={6}>
              {cancelModal ? (
                <Button
                  py={8}
                  variant="outline"
                  handleClick={onClose}
                  align="center"
                  styles={{
                    root: {
                      border: 'solid',
                      width: '100%',
                      backgroundColor: 'transparent',
                      borderColor: colors.buttonBlack,
                      borderWidth: 2,
                      color: colors.buttonBlack,
                      ':hover': {
                        backgroundColor: 'lightgray',
                      },
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
            <Grid.Col sm={12} md={6}>
              {cancelModal ? (
                <Button
                  py={8}
                  variant="outline"
                  handleClick={ctaForwardCall}
                  align="center"
                  styles={{
                    root: {
                      border: 'solid',
                      backgroundColor: 'transparent',
                      borderColor: colors.red,
                      borderWidth: 2,
                      width: '100%',
                      color: colors.red,
                      ':hover': {
                        backgroundColor: 'lightgray',
                      },
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
