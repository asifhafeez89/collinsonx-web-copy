import axios, { AxiosError } from 'axios';
import { apiAvailabilityInfo } from 'config/appInfo';
import { NextApiRequest, NextApiResponse } from 'next';

interface AvailabilityProperties {
  flightInformation: AvailabilityFlightInfo;
  guests: GuestsInfo;
  product: ProductInfo;
}

interface GuestsInfo {
  adultCount: number;
  childrenCount: number;
  infantCount: number;
}

interface ProductInfo {
  productType: string;
  productID: string;
  supplierCode: string;
}

export type AvailabilityFlightInfo = {
  type: string;
  dateTime: string;
  airport: string;
  terminal: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { flightInformation, guests, product }: AvailabilityProperties =
    req.body;

  try {
    const response = await axios.post(
      `${apiAvailabilityInfo.url}`,
      {
        flightInformation,
        guests,
        product,
      },
      {
        headers: {
          Authorization: `Bearer ${apiAvailabilityInfo.key}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err: any) {
    switch (err.response.status) {
      case 404:
        res.status(200).json({
          slots: [],
        });
        break;
      case 401:
        res.status(401).json({
          statusCode: 401,
          statusText: err.response.statusText,
        });
        break;
      case 400:
        res.status(400).json({
          statusCode: 400,
          statusText: err.response.statusText,
        });
        break;
      default:
        res.status(500).json({
          statusCode: 500,
          statusText: 'Unkown error occurred',
        });
        break;
    }
  }
}
