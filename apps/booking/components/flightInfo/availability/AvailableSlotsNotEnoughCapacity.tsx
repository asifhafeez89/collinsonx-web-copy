import { FC } from 'react';

import { useRouter } from 'next/router';

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

import BackButton from '@components/BackButton';

import fetchGrahpQLErrorObject from 'utils/fetchGrahpQLErrorObject';
import { setAdultsPrefix, setChildPrefix, setInfantPrefix } from 'utils/guests';
import { ApolloError } from '@collinsonx/utils/apollo';

type Metadata = {
  adultCount: {
    max: number;
  };
  childrenCount: {
    max: number;
  };
  infantCount: {
    max: number;
  };
};

export function hasLoungeCapacity(response: unknown | ApolloError): boolean {
  const error = fetchGrahpQLErrorObject(response);

  if (!error) return false;

  const errorPropertiesAreInvalid =
    ('code' in error && 'metadata' in error) === false;

  if (errorPropertiesAreInvalid) return false;

  const metadata = error.metadata as Metadata;

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

export function availableSlotsNotEnoughCapacityParser(slotsError: unknown) {
  const error = fetchGrahpQLErrorObject(slotsError);
  const { adultCount, childrenCount, infantCount } =
    error?.metadata as Metadata;

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
  const router = useRouter();
  const [opened, { close }] = useDisclosure(true);

  const handleChangeGuestsOnClickHandler = () => {
    router.back();
  };

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
            <Button onClick={handleChangeGuestsOnClickHandler}>
              {'Change guests'.toUpperCase()}
            </Button>
            <BackButton
              styles={{
                root: {
                  border: 'solid',
                  backgroundColor: 'white',
                  borderColor: '#000',
                  borderWidth: 2,
                  color: '#fff',
                },
                label: {
                  color: '#000',
                },
              }}
            >
              {'Return to lounges'.toUpperCase()}
            </BackButton>
          </Stack>
        </Stack>
      </Center>
    </Modal>
  );
};

export default AvailableSlotsNotEnoughCapacity;
