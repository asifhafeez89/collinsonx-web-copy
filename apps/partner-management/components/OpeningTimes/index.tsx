import {
  DaySchedules,
  OpeningTimes as OpeningTimesType,
  Schedule,
} from '@collinsonx/utils';
import classes from './OpeningTimes.module.css';
import { Box } from '@collinsonx/design-system/core';
import EditableArea from '@components/EditableArea';
import { useMemo } from 'react';
import { formatDateString } from 'utils/dateUtils';
import { DAYS } from 'config';

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
            <dd key={idx}>
              {startTime}-{endTime}
            </dd>
          )
        );
        return (
          <Box key={day} data-testid="opening-times-schedule">
            <dt className={classes.label}>{day}</dt>
            {times}
          </Box>
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
      <dl className={classes.listContainer} data-testid="opening-times-list">
        {data}
        {exceptions && (
          <Box w="100%" data-testid="opening-times-exceptions">
            <dt className={classes.label}>Opening times description</dt>
            <dd>{exceptions}</dd>
          </Box>
        )}
      </dl>
    </EditableArea>
  ) : null;
};

export default OpeningTimes;
