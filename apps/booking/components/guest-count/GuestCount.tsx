import { Flex } from '@collinsonx/design-system/core';
import useLocale from 'hooks/useLocale';

interface guestProps {
  guestList: {
    adults: number;
    children: number;
    infants: number;
  };
}

export const GuestCount = ({
  guestList: { adults, children, infants },
}: guestProps) => {
  const translations = useLocale();

  return (
    <Flex direction="row" gap={10}>
      <Flex sx={{ width: '60%' }} gap={10}>
        <p style={{ padding: '0', margin: '0' }}>
          {' '}
          {translations.booking.guestDetails.adultsInput.label}{' '}
          <span data-testid="adults">{adults}</span>
        </p>{' '}
        {Number(children) > 0 && (
          <>
            <p style={{ padding: '0', margin: '0' }}>
              {' '}
              {translations.booking.guestDetails.childrenInput.label}{' '}
              <span data-testid="children">{children}</span>
            </p>
          </>
        )}
        {Number(infants) > 0 && (
          <>
            <p style={{ padding: '0', margin: '0' }}>
              {' '}
              {translations.booking.guestDetails.infantsInput.label}{' '}
              <span data-testid="infants">{infants}</span>
            </p>
          </>
        )}
      </Flex>
    </Flex>
  );
};
