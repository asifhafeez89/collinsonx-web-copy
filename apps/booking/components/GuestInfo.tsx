import React, { useRef, useCallback } from 'react';
import {
  Stack,
  Text,
  Title,
  Anchor,
  NumberInputHandlers,
  Grid,
  Box,
  Flex,
} from '@collinsonx/design-system/core';

import { sendMobileEvent } from '@lib';

import { Warning } from '@collinsonx/design-system/assets/icons';
import QuantityInput from './QuantityInput';
import colors from 'ui/colour-constants';

import { useForm, UseFormReturnType } from '@mantine/form';
import { Labrada } from 'next/font/google';
import Notification from '@components/Notification';

import { MAX_GUESTS, MOBILE_ACTION_BACK } from '../constants';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import useLocale from 'hooks/useLocale';

export interface GuestInfoProps {
  form: UseFormReturnType<any, any>;
  loading: boolean;
  referreUrl: string;
  guestError: Boolean;
}

const GuestInfo = ({
  form,
  loading,
  referreUrl,
  guestError,
}: GuestInfoProps) => {
  const handlers = [
    useRef<NumberInputHandlers>(),
    useRef<NumberInputHandlers>(),
    useRef<NumberInputHandlers>(),
    useRef<NumberInputHandlers>(),
  ];

  const translations = useLocale();

  const handleClick = useCallback(() => {
    if (top) {
      if (referreUrl) {
        top.location.href = referreUrl;
      } else {
        const windowObj: any = window;
        sendMobileEvent(windowObj, MOBILE_ACTION_BACK);
      }
    }
  }, [referreUrl]);

  return (
    <Stack
      sx={{
        borderTop: `1px solid ${colors.borderColor}`,
        paddingTop: '0',
        backgroundColor: 'none',

        '@media (max-width: 768px)': {
          borderTop: 'none',
          padding: '0',
        },
      }}
    >
      <EditableTitle
        title={translations.booking.guestDetails.title}
        as="h3"
        showBorder={true}
      >
        <Flex direction="column" align="top">
          <Flex direction="row" align="top" gap={8}>
            <Box pt={2}>
              <Warning style={{ width: 16, height: 16 }} />
            </Box>
            <p style={{ marginTop: '0px' }}>
              {translations.booking.guestDetails.description(MAX_GUESTS)}
            </p>
          </Flex>
          {guestError ? (
            <Box
              sx={{
                '@media (max-width: 768px)': {
                  backgroundColor: colors.white,
                  padding: '1.2rem 0',
                },
              }}
            >
              <Notification>
                {translations.booking.guestDetails.errors.capacity(MAX_GUESTS)}
              </Notification>
            </Box>
          ) : (
            ''
          )}
        </Flex>
        <Grid>
          <Grid.Col lg={6}>
            <QuantityInput
              min={1}
              max={MAX_GUESTS}
              label={translations.booking.guestDetails.adultsInput.label}
              ageRange="12+"
              disabled={loading}
              handlers={handlers[0]}
              {...form.getInputProps('adults')}
            />
          </Grid.Col>

          <Grid.Col lg={6}>
            <QuantityInput
              min={0}
              max={MAX_GUESTS}
              label={translations.booking.guestDetails.childrenInput.label}
              ageRange="2-11"
              disabled={loading}
              handlers={handlers[1]}
              {...form.getInputProps('children')}
            />
          </Grid.Col>

          <Grid.Col lg={6}>
            <QuantityInput
              max={MAX_GUESTS}
              label={translations.booking.guestDetails.infantsInput.label}
              ageRange="0-2"
              disabled={loading}
              handlers={handlers[2]}
              {...form.getInputProps('infants')}
            />
          </Grid.Col>
        </Grid>
        <Text size={14} pt={16}>
          {translations.booking.guestDetails.loungeTerms.line1}
          <Anchor color={colors.blue} onClick={handleClick}>
            {translations.booking.guestDetails.loungeTerms.link}
          </Anchor>{' '}
          {translations.booking.guestDetails.loungeTerms.line2}
        </Text>
      </EditableTitle>
    </Stack>
  );
};

export default GuestInfo;
