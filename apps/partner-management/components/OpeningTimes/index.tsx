import { OpeningTimes as OpeningTimesType, Schedule } from '@collinsonx/utils';
import EditableArea from '@components/EditableArea';
import { useMemo } from 'react';
import { formatDateString } from 'utils/dateUtils';
import { DAYS } from 'config';
import { DescriptionList } from '@collinsonx/design-system';

const { Term, Description, Group } = DescriptionList;

export interface OpeningTimesProps {
  openingTimes: OpeningTimesType;
}

const OpeningTimes = ({ openingTimes }: OpeningTimesProps) => {
  const { exceptions } = openingTimes;
  const lastEdited = useMemo(() => {
    const { meta } = openingTimes;
    if (meta?.lastEdited) {
      return formatDateString(meta.lastEdited);
    }
    return '-';
  }, [openingTimes]);

  const data = useMemo(() => {
    if (!openingTimes || !openingTimes?.schedules) {
      return null;
    }
    const { schedules } = openingTimes;
    return DAYS.map((day) => {
      const daySchedule = schedules[day];
      if (daySchedule && daySchedule.length) {
        const times = (daySchedule as Schedule[]).map(
          ({ startTime, endTime }, idx) => (
            <Description key={idx}>
              {startTime}-{endTime}
            </Description>
          )
        );
        return (
          <Group key={day} data-testid="opening-times-schedule">
            <Term>{day}</Term>
            {times}
          </Group>
        );
      } else {
        return null;
      }
    }).filter((schedule) => !!schedule);
  }, [openingTimes]);

  return data || exceptions ? (
    <EditableArea
      title="Opening times"
      subtitle={`Last edited: ${lastEdited}`}
      data-testid="outlet-opening-times"
    >
      <DescriptionList data-testid="opening-times-list">
        {data}
        {exceptions && (
          <Group fw data-testid="opening-times-exceptions">
            <Term>Opening times description</Term>
            <Description>{exceptions}</Description>
          </Group>
        )}
      </DescriptionList>
    </EditableArea>
  ) : null;
};

export default OpeningTimes;
