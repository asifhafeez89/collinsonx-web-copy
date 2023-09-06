import { ApolloError, useMutation, useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import {
  PageTitle,
  LoungeImageTitle,
  Details,
  Button,
} from '@collinsonx/design-system';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { Box, Flex, Stack, Text } from '@collinsonx/design-system/core';
import { useRouter } from 'next/router';
import createBooking from '@collinsonx/utils/mutations/createBooking';
import Link from 'next/link';
import { Breadcramp } from '@collinsonx/design-system';
import { Clock, MapPin } from '@collinsonx/design-system/assets/icons';
import { useMemo, useState, useEffect, useRef } from 'react';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import BookingFormSkeleton from '@components/BookingFormSkeleton';
import LoungeError from '@components/LoungeError';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { Availability } from '@collinsonx/utils';
import AvailableSlots from '@components/flightInfo/AvailableSlots';
import getAvailableSlots from '@collinsonx/utils/queries/getAvailableSlots';
import { validateFlightNumber } from '../utils/flightValidation';
import { FlightDetails, Slots } from '@collinsonx/utils';
import getFlightDetails from '@collinsonx/utils/queries/getFlightDetails';
import {
  AIRPORT_CODE_TYPE,
  OAG_API_VERSION,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_REDABLE_FORMAT,
} from '../config/Constants';
import { formatDate } from '../utils/DateFormatter';
import usePayload from 'hooks/payload';
interface AvailableSlotsProps {
  availableSlots: Availability;
}

export default function ConfirmAvailability({
  availableSlots,
}: AvailableSlotsProps) {
  const router = useRouter();

  const {
    loading,
    error: fetchError,
    data: experienceData,
  } = useQuery<{ searchExperiences: Experience[] }>(getSearchExperiences);

  const [createLoading, setCreateLoading] = useState(false);
  const [selectedslot, setSelectedslot] = useState('');
  const { token, loungeCode } = usePayload();

  //change later
  //change to Query parameters
  const {
    id,
    flightNumber,
    departureDate,
    adultCount,
    childrentCount,
    productID,
    supplierCode,
  } = router.query;
  //change later

  const flightBreakdown = validateFlightNumber(String(flightNumber));
  const lounge = useMemo(() => {
    const { id } = router.query;
    return experienceData?.searchExperiences?.length
      ? experienceData.searchExperiences.find((item) => item.id === id)!
      : null;
  }, [experienceData, router]);

  const handleSubmit = () => {
    router.push({
      pathname: '/confirm-booking',
      query: {
        flightNumber: flightNumber,
        departureDate: departureDate,
        adultCount: adultCount,
        childrentCount: childrentCount,
        arrivalTime: selectedslot,
        in: token,
        id: id,
        lc: loungeCode,
      },
    });
  };

  const { data: fligtData } = useQuery<{
    getFlightDetails: FlightDetails[];
  }>(getFlightDetails, {
    variables: {
      flightDetails: {
        carrierCode: flightBreakdown[1] ?? '',
        codeType: AIRPORT_CODE_TYPE,
        departureDate: formatDate(new Date(String(departureDate)), DATE_FORMAT),
        flightNumber: flightBreakdown[2] ?? '',
        version: OAG_API_VERSION,
      },
    },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {},
  });

  const { error, data: slotsData } = useQuery<{
    getAvailableSlots: Availability;
  }>(getAvailableSlots, {
    variables: {
      data: {
        flightInformation: {
          type: 'DEPARTURE',
          dateTime: `${fligtData?.getFlightDetails[0]?.departure?.dateTime?.local}`,
          airport: `${fligtData?.getFlightDetails[0]?.departure?.airport}`,
          terminal: '-1',
        },
        guests: {
          adultCount: Number(adultCount),
          childrenCount: Number(childrentCount),
          infantCount: 0,
        },
        product: {
          productType: 'Lounge',
          productID: productID,
          supplierCode: supplierCode,
        },
      },
    },
    skip: !fligtData?.getFlightDetails[0],
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {},
  });

  useEffect(() => {}, [id, flightNumber, departureDate]); //  dependency

  const handleSelectSlot = (value: string) => {
    setSelectedslot(value);
  };

  const infos = [
    {
      header: 'Day of flight',
      description: formatDate(
        new Date(
          `${fligtData?.getFlightDetails[0]?.departure?.dateTime?.local}`
        ),
        DATE_REDABLE_FORMAT
      ),
      icon: <MapPin width={16} height={16} color="#0C8599" />,
    },
    {
      header: 'Time of flight',
      description: formatDate(
        new Date(
          `${fligtData?.getFlightDetails[0]?.departure?.dateTime?.local}`
        ),
        TIME_FORMAT
      ),
      icon: <Clock width={16} height={16} color="#0C8599" />,
    },
    {
      header: 'Flight number',
      description: flightNumber,
      icon: <Clock width={16} height={16} color="#0C8599" />,
    },
  ];

  return (
    <Layout>
      <Stack sx={{ width: '100%' }}>
        <Breadcramp title="Back to Gatwick" url="https://bbc.co.uk" />
      </Stack>
      {createLoading ? (
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'lg' }}
          justify={{ sm: 'center' }}
        ></Flex>
      ) : (
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'lg' }}
          justify={{ sm: 'center' }}
        >
          {loading && <BookingFormSkeleton />}
          {!loading && (
            <Box>
              <LoungeError error={fetchError} />
              {lounge && (
                <Stack spacing={8}>
                  <Stack p={24} spacing={24} bg="#FFF">
                    <LoungeImageTitle
                      title={lounge.loungeName ?? ''}
                      location={'London Gatwick, North Terminal'}
                      price={'£8.00 GBP'}
                      image={
                        lounge.images &&
                        lounge.images[0] &&
                        lounge.images[0].url
                          ? lounge.images[0].url
                          : 'https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg'
                      }
                    />
                  </Stack>
                  <EditableTitle title="Flight details" to="/step1" as="h2">
                    <Details infos={infos} direction="row" />
                  </EditableTitle>

                  <EditableTitle title="Who's coming" to="/step1" as="h2">
                    <Flex direction="row" gap={10}>
                      <p style={{ padding: '0', margin: '0' }}>
                        {' '}
                        <strong>Adults</strong> {adultCount}
                      </p>{' '}
                      {Number(childrentCount) > 0 ? (
                        <>
                          <p style={{ padding: '0', margin: '0' }}>
                            {' '}
                            <strong>Children</strong> {childrentCount}
                          </p>
                        </>
                      ) : null}
                    </Flex>
                  </EditableTitle>

                  {slotsData ? (
                    <AvailableSlots
                      onSelectSlot={handleSelectSlot}
                      availableSlots={slotsData?.getAvailableSlots}
                    />
                  ) : null}
                  <Text>
                    This is a rough estimate so that lounge can prepare for your
                    arrival
                  </Text>
                  <EditableTitle title="Cancelation policy" as="h2">
                    <p style={{ padding: '0', margin: '0' }}>
                      Free cancellation for 24 hours. Cancel before [date of
                      flight] for a partial refund.
                    </p>
                    <Link href="cancelation-policy">Learn more</Link>
                  </EditableTitle>

                  <div>
                    <p>
                      As your flight is at 7:00am, your maximum stay is 3 hours
                      prior.
                    </p>
                  </div>
                </Stack>
              )}

              <Button
                type="submit"
                data-testid="submit"
                spacing="20px"
                align="center"
                handleClick={handleSubmit}
              >
                CONFIRM
              </Button>
            </Box>
          )}
        </Flex>
      )}
    </Layout>
  );
}

ConfirmAvailability.getLayout = (page: JSX.Element) => <>{page}</>;
