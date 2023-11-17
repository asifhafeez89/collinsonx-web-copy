import { Flex } from '@collinsonx/design-system/core';

interface EstimatedTimeArrivalProps {
  arrival: string;
}

const EstimatedTimeArrival = ({ arrival }: EstimatedTimeArrivalProps) => {
  return (
    <>
      <p style={{ padding: '0', margin: '0' }}>
        Timeslots are shown in the time zone of the lounge location
      </p>
      <Flex direction="row" gap={5}>
        <p style={{ padding: '0', margin: '0' }}> {arrival}</p>{' '}
      </Flex>
    </>
  );
};

export default EstimatedTimeArrival;
