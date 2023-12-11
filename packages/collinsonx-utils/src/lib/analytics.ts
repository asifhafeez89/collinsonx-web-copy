import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

export const loggerDataError = (
  error: Error,
  file: string,
  action: string,
  data: unknown,
  shouldLog: boolean = false
) => {
  if (shouldLog) {
    if (typeof document !== 'undefined') {
      datadogLogs.logger.error(
        'Frontend Error Occured',
        {
          file,
          action,
          data,
        },
        error
      );
    }
  }
};

export const loggerInfo = (
  file: string,
  action: string,
  data: unknown,
  shouldLog: Boolean = false
) => {
  if (shouldLog) {
    if (typeof document !== 'undefined') {
      datadogLogs.logger?.info('Frontend Info', {
        file,
        action,
        data,
      });
    }
  }
};

export const loggerAction = async (
  file: string,
  action: string,
  data?: unknown
) => {
  if (typeof document !== 'undefined') {
    await datadogRum.addAction(action, {
      file: file,
      data: data,
    });
  }
};
