import { FC } from 'react';

import {
  Box,
  Stack,
  Divider,
  Center,
  Title,
  Modal,
} from '@collinsonx/design-system/core';
import { useDisclosure } from '@collinsonx/design-system/hooks';

import fetchGrahpQLErrorObject from 'utils/fetchGrahpQLErrorObject';

import { setHeaderTitle } from './helpers';
import { HeaderStyle, FooterStyle } from './enums';
import type { Metadata } from './types';
import type { ComponentProps } from './props';
import { CapacityErrorMessage, Footer, UnknownMessage } from './components';

import colors from 'ui/colour-constants';

export function capacityParser(slotsError: unknown) {
  const error = fetchGrahpQLErrorObject(slotsError);
  const { adultCount, childrenCount, infantCount } =
    error?.metadata as Metadata;

  const adults = adultCount.max;
  const child = childrenCount.max;
  const infants = infantCount.max;

  return generateError(
    HeaderStyle.CAPACITY,
    FooterStyle.CAPACITY,
    <CapacityErrorMessage adults={adults} child={child} infants={infants} />
  );
}

export function internalServerError() {
  return generateError(
    HeaderStyle.UNKNOWN,
    FooterStyle.INTERNAL_SERVER_ERROR,
    <UnknownMessage />
  );
}

export function defaultError() {
  return generateError(
    HeaderStyle.UNKNOWN,
    FooterStyle.CAPACITY,
    <UnknownMessage />
  );
}

export function capacityDefaultError() {
  return generateError(
    HeaderStyle.CAPACITY,
    FooterStyle.CAPACITY,
    <CapacityErrorMessage />
  );
}

function generateError(
  header: HeaderStyle,
  footer: FooterStyle,
  Message: JSX.Element
) {
  return (
    <AvailableSlotsModal
      headerStyle={header}
      footerStyle={footer}
      Message={Message}
    />
  );
}

const AvailableSlotsModal: FC<ComponentProps> = ({
  headerStyle,
  footerStyle,
  Message,
}) => {
  const [opened, { close }] = useDisclosure(true);

  return (
    <Modal opened={opened} onClose={close} p="0">
      <Center>
        <Stack>
          <Box>
            <Title
              size="h3"
              style={{
                textAlign: 'center',
              }}
            >
              {setHeaderTitle(headerStyle)}
            </Title>
          </Box>
          <Stack>{Message}</Stack>
          <Divider my="sm" m={0} />
          <Stack bg={colors.dialogFooter} p="lg">
            <Footer footerStyle={footerStyle} />
          </Stack>
        </Stack>
      </Center>
    </Modal>
  );
};
