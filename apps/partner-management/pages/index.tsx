import Layout from '@components/Layout';
import { bookings } from './bookings.json';
import dayjs from 'dayjs';
import { CSSProperties } from 'react';

type Booking = {
  id: string;
  name: string;
  reservation_date: string;
  booking_status: string;
};

const ulStyle: CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  listStyle: 'none',
  margin: 0,
  padding: '1rem',
  justifyContent: 'stretch',
};

const liStyle: CSSProperties = {
  margin: 0,
  marginRight: '1rem',
  padding: 0,
  width: '100%',
  flex: '1 1',
};

function getColour(status: string) {
  switch (status) {
    case 'PENDING':
      return {
        backgroundColor: '#FEF3DA',
        borderColor: '#FAB005',
      };
    case 'CONFIRMED':
      return {
        backgroundColor: '#EEF9E7',
        borderColor: '#54C50D',
      };
    case 'DECLINED':
    default:
      return {
        backgroundColor: '#FDECEC',
        borderColor: '#F03E3E',
      };
  }
}

export default function PartnerManagement() {
  return (
    <>
      <h1 style={{ margin: 0, padding: 0, marginBottom: '1rem' }}>
        Lounge booking management
      </h1>
      <h2
        style={{
          margin: 0,
          padding: 0,
          marginBottom: '1rem',
          fontWeight: 'normal',
        }}
      >
        Club Aspire Lounge
      </h2>
      <div>
        <ul
          style={{
            ...ulStyle,
            background: 'rgba(71, 212, 177, 0.1)',
            fontWeight: '600',
            borderWidth: '1px 1px 0 1px',
            borderStyle: 'solid',
            borderColor: '#ADB5BD',
          }}
        >
          <li style={liStyle}>Customer name</li>
          <li style={liStyle}>Date of booking</li>
          <li style={liStyle}>Time of booking</li>
          <li style={liStyle}>Booking status</li>
          <li style={liStyle}>Action</li>
        </ul>
      </div>
      <ul
        style={{
          ...ulStyle,
          flexDirection: 'column',
          padding: 0,
          borderWidth: '0 1px 1px 1px',
          borderStyle: 'solid',
          borderColor: '#ADB5BD',
        }}
      >
        {(bookings as Booking[]).map(
          ({ id, name, reservation_date, booking_status }, index) => (
            <ul
              key={id}
              style={{
                ...ulStyle,
                padding: '1rem',
                backgroundColor: index % 2 ? '#F5F5F5' : '#fff',
                alignItems: 'center',
              }}
            >
              <li style={liStyle}>{name}</li>
              <li style={liStyle}>
                {dayjs(reservation_date).format('DD/MM/YYYY')}
              </li>
              <li style={liStyle}>{dayjs(reservation_date).format('hh:mm')}</li>
              <li
                style={{
                  ...liStyle,
                  color: '#000',
                  padding: '0.25rem',
                  textAlign: 'center',
                  borderRadius: 6,
                  borderWidth: 2,
                  borderStyle: 'solid',
                  backgroundColor: getColour(booking_status).backgroundColor,
                  borderColor: getColour(booking_status).borderColor,
                }}
              >
                Booking {booking_status.toLowerCase()}
              </li>
              <li
                style={{
                  ...liStyle,
                  backgroundColor: '#000',
                  color: '#fff',
                  padding: '0.25rem',
                  textAlign: 'center',
                  borderRadius: '1rem',
                }}
              >
                Customer arrived
              </li>
            </ul>
          )
        )}
      </ul>
    </>
  );
}

PartnerManagement.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
