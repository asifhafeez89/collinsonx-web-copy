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

import { setAdultsPrefix, setChildPrefix, setInfantPrefix } from 'utils/guests';

function fetchErrorObject(slotsError: any) {
  console.error('slotsError', slotsError);
  if (!slotsError) {
    return null;
  }

  if ('errors' in slotsError) {
    if (typeof slotsError.errors === 'object') {
      const data = slotsError.errors[0];
      if ('extensions' in data) {
        return data.extensions;
      }
    }
  }

  return null;
}

export function hasLoungeCapacity(slotsError: any): boolean {
  const error = fetchErrorObject(slotsError);

  if (!error) return false;

  const errorPropertiesAreInvalid =
    ('code' in error && 'metadata' in error) === false;

  if (errorPropertiesAreInvalid) return false;

  const metadata = error.metadata;
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

  return true;
}

export function availableSlotsNotEnoughCapacityParser(slotsError: any) {
  const error = fetchErrorObject(slotsError);
  const { adultCount, childrenCount, infantCount } = error.metadata;

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
