import Layout from '../components/Layout';

export default function BookingManagement() {
  return <div>Booking Management</div>;
}

BookingManagement.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
