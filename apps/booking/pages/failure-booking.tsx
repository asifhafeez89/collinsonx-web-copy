import { useLazyQuery, useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import { Box, Flex, Stack } from '@collinsonx/design-system/core';
import Breadcramp from '@components/Breadcramp';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';
import { LoungeInfo } from '@components/LoungeInfo';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import { Details, Button } from '@collinsonx/design-system';
import createBooking from '@collinsonx/utils/mutations/createBooking';
import Link from 'next/link';

import { Clock, MapPin } from '@collinsonx/design-system/assets/icons';
import { useMemo, useState, useEffect, useRef, useContext } from 'react';
import BookingFormSkeleton from '@components/BookingFormSkeleton';
import LoungeError from '@components/LoungeError';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { Availability } from '@collinsonx/utils';
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
import { InfoGroup } from '@collinsonx/design-system/components/details';
import { BookingContext } from 'context/bookingContext';
import { getCheckoutSessionUrl } from 'services/payment';

interface AvailableSlotsProps {
  availableSlots: Availability;
}

export default function SuccessBooking({
  availableSlots,
}: AvailableSlotsProps) {
  const router = useRouter();

  const {
    loading,
    error: fetchError,
    data: experienceData,
  } = useQuery<{ searchExperiences: Experience[] }>(getSearchExperiences);

  const { getBooking, setBooking } = useContext(BookingContext);

  const [createLoading, setCreateLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    flightNumber,
    departureDate,
    children,
    carrierCode,
    adults,
    arrival,
    bookingId,
    infants,
    seniors,
  } = getBooking();

  const flightBreakdown = validateFlightNumber(String(flightNumber));
  const { payload, lounge } = usePayload();

  const flightCode = useMemo(
    () =>
      flightNumber ? validateFlightNumber(flightNumber as string) : undefined,

    [flightNumber]
  );

  const handleSubmit = async () => {};

  const { data: fligtData } = useQuery<{
    getFlightDetails: FlightDetails[];
  }>(getFlightDetails, {
    variables: {
      flightDetails: {
        carrierCode: flightCode ? flightCode[1] : '',
        codeType: AIRPORT_CODE_TYPE,
        departureDate: formatDate(new Date(String(departureDate)), DATE_FORMAT),
        flightNumber: flightCode ? flightCode[2] : '',
        version: OAG_API_VERSION,
      },
    },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {},
  });

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
      <Stack spacing={16}>
        <Stack sx={{ width: '100%' }}>
          <Breadcramp
            lefttitle={`BACK TO ${lounge?.loungeName?.toUpperCase()}`}
            lefturl="/"
            righttile={`FAQs`}
            righturl="https://bbc.co.uk"
          />
        </Stack>
        <Flex justify="center" align="center" direction="column">
          <Stack maw={591} spacing={24}>
            <LoungeInfo
              guests={{ adults, children, infants }}
              lounge={lounge}
              loading={!lounge}
            />
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
                        <EditableTitle title="Flight details" to="/" as="h2">
                          <Details
                            infos={infos as InfoGroup[]}
                            direction="row"
                          />
                        </EditableTitle>

                        <EditableTitle title="Who's coming" to="/" as="h2">
                          <Flex direction="row" gap={10}>
                            <p style={{ padding: '0', margin: '0' }}>
                              {' '}
                              <strong>Adults</strong> {adults}
                            </p>{' '}
                            {Number(children) > 0 ? (
                              <>
                                <p style={{ padding: '0', margin: '0' }}>
                                  {' '}
                                  <strong>Children</strong> {children}
                                </p>
                              </>
                            ) : null}
                          </Flex>
                        </EditableTitle>

                        <EditableTitle
                          title="Estimated time of arrival"
                          to="/check-availability"
                          as="h2"
                        >
                          <Flex direction="row" gap={10}>
                            <p style={{ padding: '0', margin: '0' }}>
                              {' '}
                              {arrival?.split('-')[0]}
                            </p>{' '}
                          </Flex>
                        </EditableTitle>

                        <div>
                          This is a rough estimate so that lounge can prepare
                          for your arrival
                        </div>
                        <EditableTitle title="Cancelation policy" as="h2">
                          <p style={{ padding: '0', margin: '0' }}>
                            Free cancellation for 24 hours. Cancel before [date
                            of flight] for a partial refund.
                          </p>
                          <Link href="cancelation-policy">Learn more</Link>
                        </EditableTitle>

                        <div>
                          <p>
                            As your flight is at 7:00am, your maximum stay is 3
                            hours prior.
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
                      DOWNLOAD
                    </Button>
                  </Box>
                )}
              </Flex>
            )}
          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
}

SuccessBooking.getLayout = (page: JSX.Element) => <>{page}</>;
