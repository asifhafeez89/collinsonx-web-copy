import { Box } from '@collinsonx/design-system/core';
import useLocale from 'hooks/useLocale';

function RetryOptions() {
  const translations = useLocale();

  return (
    <Box>
      {translations.lounge.errors.capacity.solutions.title}:
      <ul>
        {translations.lounge.errors.capacity.solutions.points.map((point) => (
          <li>{point}</li>
        ))}
      </ul>
    </Box>
  );
}

export default RetryOptions;
