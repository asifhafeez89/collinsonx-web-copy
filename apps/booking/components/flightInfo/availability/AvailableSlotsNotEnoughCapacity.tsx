import { FC } from 'react';

import {
  Box,
  Stack,
  Button,
  Divider,
  Center,
  Title,
  Modal,
} from '@collinsonx/design-system/core';
import { useDisclosure } from '@collinsonx/design-system/hooks';

import BackToLounge from '@components/BackToLounge';

import { AVAILABLE_SLOTS_ERRORS } from '../../../constants/graphql/errors';

import colors from '../../../ui/colour-constants';

function setAdultsPrefix(adults: number): string {
  if (adults === 1) return `${adults} adult`;

  return `${adults} adults`;
}

function setChildPrefix(child: number, adults: number): string {
  let guestsPrefix = '';
  if (adults > 0) {
    guestsPrefix = ' and ';
  }

  if (child === 0) return '';

  const sufix = child === 1 ? 'child' : 'children';

  return `${guestsPrefix}${child} ${sufix}`;
}

function setInfantPrefix(
  infant: number,
  adults: number,
  child: number
): string {
  let guestsPrefix = '';
  if (adults > 0 || child > 0) {
    guestsPrefix = ' and ';
  }

  if (infant === 0) return '';

  if (infant === 1) {
    return `${guestsPrefix}${infant} infant`;
  }

  return `${guestsPrefix}${infant} infants`;
}

export function hasLoungeCapacity(slotsError: any): boolean {
  const errorPropertiesAreInvalid =
    ('code' in slotsError && 'metadata' in slotsError) === false;

  if (errorPropertiesAreInvalid) return false;

  const metadata = slotsError.metadata;
  const metadataPropertiesAreInvalid =
    ('adultCount' in metadata &&
      'childrenCount' in metadata &&
      'infantCount' in metadata) === false;

  if (metadataPropertiesAreInvalid) return false;

  const { adultCount, childrenCount, infantCount } = metadata;
  const maxPropertiesAreInvalid =
    ('max' in adultCount && 'max' in childrenCount && 'max' in infantCount) ===
    false;

  if (maxPropertiesAreInvalid) return false;

  return (
    slotsError.code === AVAILABLE_SLOTS_ERRORS.SNAPLOGIC.ENOUGH_CAPACITY.code
  );
}

export function availableSlotsNotEnoughCapacityParser(slotsError: any) {
  const { adultCount, childrenCount, infantCount } = slotsError.metadata;

  const adults = adultCount.max;
  const child = childrenCount.max;
  const infants = infantCount.max;

  return (
    <AvailableSlotsNotEnoughCapacity
      adults={adults}
      child={child}
      infants={infants}
    />
  );
}

interface Props {
  adults: number;
  child: number;
  infants: number;
}

const AvailableSlotsNotEnoughCapacity: FC<Props> = ({
  adults = 0,
  child = 0,
  infants = 0,
}) => {
  const [opened, { close }] = useDisclosure(true);

  return (
    <Modal opened={opened} onClose={close} p="0">
      <Center>
        <Stack>
          <Box>
            <Title size="h3">No enough spaces in the lounge</Title>
          </Box>

          <Stack>
            <Box>
              Our apologies, but capacity of the lounge for the time slot you
              selected is {setAdultsPrefix(adults)}
              {setChildPrefix(child, adults)}
              {setInfantPrefix(infants, adults, child)}
            </Box>
            <Box>
              You can:
              <ul>
                <li>change time slot</li>
                <li>change number of guests</li>
                <li>find another lounge</li>
              </ul>
            </Box>
          </Stack>
          <Divider my="sm" m={0} />
          <Stack bg={'#F7F7F7'} p="lg">
            <Button onClick={close}>Change guests</Button>
            <BackToLounge />
          </Stack>
        </Stack>
      </Center>
    </Modal>
  );
};

export default AvailableSlotsNotEnoughCapacity;
