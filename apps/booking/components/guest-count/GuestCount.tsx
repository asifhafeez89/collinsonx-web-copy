import { Flex } from '@collinsonx/design-system/core';

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
  return (
    <Flex direction="row" gap={10}>
      <Flex sx={{ width: '60%' }} gap={10}>
        <p style={{ padding: '0', margin: '0' }}>
          {' '}
          Adults <span data-testid="adults">{adults}</span>
        </p>{' '}
        {Number(children) > 0 && (
          <>
            <p style={{ padding: '0', margin: '0' }}>
              {' '}
              Children <span data-testid="children">{children}</span>
            </p>
          </>
        )}
        {Number(infants) > 0 && (
          <>
            <p style={{ padding: '0', margin: '0' }}>
              {' '}
              Infants <span data-testid="infants">{infants}</span>
            </p>
          </>
        )}
      </Flex>
    </Flex>
  );
};
