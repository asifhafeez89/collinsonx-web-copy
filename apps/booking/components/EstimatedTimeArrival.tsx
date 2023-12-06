import { Flex } from '@collinsonx/design-system/core';
import useLocale from 'hooks/useLocale';

interface EstimatedTimeArrivalProps {
  arrival: string;
}

const EstimatedTimeArrival = ({ arrival }: EstimatedTimeArrivalProps) => {
  const translations = useLocale();

  return (
    <>
      <p style={{ padding: '0', margin: '0' }}>
        {translations.booking.availableSlots.description}
      </p>
      <Flex direction="row" gap={5}>
        <p style={{ padding: '0', margin: '0' }}> {arrival}</p>{' '}
      </Flex>
    </>
  );
};

export default EstimatedTimeArrival;
