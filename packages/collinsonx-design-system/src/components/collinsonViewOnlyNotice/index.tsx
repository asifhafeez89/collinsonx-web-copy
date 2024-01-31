import { Box } from '@mantine/core';
import colors from '../../colour-constants-partner';

function CollinsonViewOnlyNotice() {
  return (
    <Box
      style={{
        width: '205px',
        padding: '8px 16px',
        fontSize: '14px',
        backgroundColor: colors['bg-blue'],
      }}
    >
      *COLLINSON VIEW ONLY
    </Box>
  );
}

export default CollinsonViewOnlyNotice;
