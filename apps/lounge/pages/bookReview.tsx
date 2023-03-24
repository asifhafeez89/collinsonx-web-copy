import { Stack } from '@collinsonx/design-system/core';
import Layout from '@components/Layout';
import { PageTitle, Lounge } from '@collinsonx/design-system';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { NextPageContext } from 'next';
import { BookingFormValue } from '@components/BookingForm/index';
import BookingFormConfirm from '@components/BookingForm/BookingFormConfirm';
import { useRouter } from 'next/router';
import { useMutation } from '@collinsonx/utils/apollo';

import createBooking from '@collinsonx/utils/mutations/createBooking';

export interface BookReviewProps {
  lounge: Experience;
  formValues: BookingFormValue;
}

export default function BookReview({ lounge, formValues }: BookReviewProps) {
  const router = useRouter();

  const [createBookingCall, { loading: createLoading, error, data }] =
    useMutation(createBooking);

  const handleClickConfirm = () => {
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
      });
    }
  };

  return (
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
  );
}

type Lounge = {
  id: string;
};

interface QueryProps extends NextPageContext {
  lounge: Lounge;
}

export async function getServerSideProps({ query }: QueryProps) {
  let lounge = null;
  let formValues = null;

  try {
    lounge = JSON.parse((query?.lounge as string) ?? null);
    formValues = JSON.parse((query?.formValues as string) ?? null);
  } catch {}

  return {
    props: {
      lounge,
      formValues,
    },
  };
}

BookReview.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
