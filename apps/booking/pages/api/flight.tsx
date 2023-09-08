import axios, { AxiosError } from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { apiFlightInfo } from '../../config/appInfo';
import { NextApiRequest, NextApiResponse } from 'next';

dayjs.extend(utc);

interface FlightProperties {
  carrierCode: string;
  flightNumber: string;
  departureDate: string;
}

export type FlightInfo = {
  departureDate: Dayjs;
  flightNumber: number;
  carrierCode: string;
  terminal: string;
  airport: string;
};

export interface APIFlightLegInfo {
  airport: { iata: string };
  date: { local: string; utc: string };
  time: { local: string; utc: string };
  terminal: string;
}

export interface APIFlightInfo {
  departure: APIFlightLegInfo;
  flightNumber: number;
  carrier: {
    iata?: string;
    icao?: string;
  };
}
export interface APIFlightInfoResponse {
  data: APIFlightInfo[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { carrierCode, flightNumber, departureDate }: FlightProperties =
    req.body;

  try {
    const response = await axios.get<APIFlightInfoResponse>(
      `${apiFlightInfo?.url}`,
      {
        params: {
          CarrierCode: carrierCode,
          FlightNumber: flightNumber,
          DepartureDateTime: departureDate,
          CodeType: 'IATA,ICAO',
          version: 'v2',
        },
        headers: {
          'Subscription-Key': apiFlightInfo.subscriptionKey,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err: any) {
    switch (err.response.status) {
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
