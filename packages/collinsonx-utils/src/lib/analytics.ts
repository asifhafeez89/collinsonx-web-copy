export const loggerDataError = (
  error: Error,
  file: string,
  action: string,
  data: unknown,
  shouldLog: boolean = false,
  datadogLogs: any
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
  shouldLog: Boolean = false,
  datadogLogs: any
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
  data?: unknown,
  datadogRum?: any
) => {
  if (typeof document !== 'undefined') {
    await datadogRum.addAction(action, {
      file: file,
      data: data,
    });
  }
};
