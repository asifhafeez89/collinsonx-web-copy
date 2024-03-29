import colors from 'ui/colour-constants';
import React, { useState } from 'react';
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import { Button } from '@collinsonx/design-system/core';
import { logAction, logInfo, sendMobileEvent } from '@lib';
import { MOBILE_ACTION_DATA_URI } from '../../constants';
import { BookingConfirmedPdfProps } from './BookingConfirmationProps';
import { BookingConfirmationPDF } from './BookingConfirmationPDF';
import useLocale from 'hooks/useLocale';

const FILENAME = 'GenerateBookingConfirmation.tsx';

export const GenerateBookingConfirmedPdf = (
  props: BookingConfirmedPdfProps
) => {
  const { platform } = props;
  const pdf = <BookingConfirmationPDF {...props} />;
  const [dataUriError, setDataUriError] = useState<boolean>(false);

  const translations = useLocale();

  const sendDataUri = (blob: Blob) => {
    const reader = new FileReader();

    setDataUriError(false);
    logInfo(FILENAME, 'Creating Webview PDF Data URI', {});

    reader.onload = () => {
      const event = JSON.stringify({
        event: MOBILE_ACTION_DATA_URI,
        payload: reader.result,
      });

      logInfo(FILENAME, 'Posting PDF Data URI to App', MOBILE_ACTION_DATA_URI);
      sendMobileEvent(window, event);
    };

    reader.onerror = () => {
      setDataUriError(true);
      logInfo(FILENAME, 'Create Webview PDF Data URI Failed', {});
    };

    reader.readAsDataURL(blob);
  };

  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          padding: '1.25rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {platform === 'web' ? (
          <PDFDownloadLink
            document={pdf}
            fileName={`booking_confirmation_${props.reference}`}
            onClick={() => logAction('downloadPdf', props.analyticsTag)}
            style={{
              borderRadius: 4,
              fontSize: 18,
              height: 'auto',
              backgroundColor: colors.theme,
              padding: '0 18px',
              display: 'flex',
              width: 'auto',
              textDecoration: 'none',
              alignItems: 'center',
            }}
            className="elIgnore"
            data-testid="submit"
          >
            {({ loading }) =>
              loading ? (
                translations.booking.confirmationPDF.loadingText
              ) : (
                <span
                  style={{
                    height: '100%',
                    display: 'flex',
                    fontWeight: 600,
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.white,
                    padding: '0.5rem 0',
                  }}
                >
                  {
                    translations.booking.confirmationPayment.outcome.succesful
                      .btn.download
                  }
                </span>
              )
            }
          </PDFDownloadLink>
        ) : (
          <BlobProvider document={pdf}>
            {({ loading, blob }) =>
              loading || !blob ? (
                translations.booking.confirmationPDF.loadingText
              ) : (
                <Button onClick={() => sendDataUri(blob)} data-testid="submit">
                  <span
                    style={{
                      height: '100%',
                      display: 'flex',
                      fontWeight: 600,
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.white,
                      padding: '0.5rem 0',
                    }}
                  >
                    {
                      translations.booking.confirmationPayment.outcome.succesful
                        .btn.download
                    }
                  </span>
                </Button>
              )
            }
          </BlobProvider>
        )}
      </div>
      {dataUriError && (
        <p
          style={{
            color: colors.errorPlaceholder,
            textAlign: 'center',
            marginTop: 0,
          }}
        >
          {translations.booking.confirmationPDF.error}
        </p>
      )}
    </div>
  );
};
