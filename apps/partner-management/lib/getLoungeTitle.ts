import { Experience } from '@collinsonx/utils';

const getLoungeTitle = (loungeData: Experience | undefined) =>
  !loungeData
    ? ''
    : `${loungeData?.loungeName}${
        loungeData?.location?.airportName
          ? ' - ' + loungeData?.location?.airportName
          : ''
      }${
        loungeData?.location?.terminal
          ? ' - ' + loungeData?.location?.terminal
          : ''
      } `;

export default getLoungeTitle;
