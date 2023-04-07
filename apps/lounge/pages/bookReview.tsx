import { Flex, Stack } from '@collinsonx/design-system/core';
import Layout from '@components/Layout';
import { PageTitle, Lounge } from '@collinsonx/design-system';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { NextPageContext } from 'next';
import { BookingFormValue } from '@components/BookingForm/index';
import BookingFormConfirm from '@components/BookingForm/BookingFormConfirm';
import { useRouter } from 'next/router';
import { useMutation } from '@collinsonx/utils/apollo';
import createBooking from '@collinsonx/utils/mutations/createBooking';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import { useState } from 'react';

export interface BookReviewProps {
  lounge: Experience;
  formValues: BookingFormValue;
}

export default function BookReview() {
  const router = useRouter();

  const lounge = JSON.parse((router.query?.lounge as string) ?? null);
  const formValues = JSON.parse((router.query?.formValues as string) ?? null);

  const [createBookingCall, { loading: createLoading, error, data }] =
    useMutation(createBooking);

  const [loading, setLoading] = useState(false);

  const handleClickConfirm = () => {
    setLoading(true);
    if (formValues.date) {
      createBookingCall({
        variables: {
          bookingInput: {
            bookedFrom: formValues.date,
            bookedTo: formValues.date,
            experience: {
              id: lounge.id,
            },
          },
        },
        onCompleted: () => {
          router.push('/success');
        },
        onError: () => {
          setLoading(false);
        },
      });
    }
  };

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" h="100%">
          <LoaderLifestyleX />
        </Flex>
      ) : (
        <>
          {lounge && (
            <Stack sx={{ position: 'relative' }}>
              <PageTitle
                title={`Book ${lounge?.name}`}
                url={`/book?id=${lounge.id}`}
              />
              <Lounge
                airport={lounge?.location ?? '-'}
                loungeName={undefined}
                openingTimes={
                  (lounge.openingHours as unknown as string[])
                    ?.join(',')
                    .substring(0, 20) ?? '-'
                }
                image={undefined}
              />
              <BookingFormConfirm
                {...formValues}
                onClickConfim={handleClickConfirm}
              />
            </Stack>
          )}
        </>
      )}
    </>
  );
}

BookReview.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
