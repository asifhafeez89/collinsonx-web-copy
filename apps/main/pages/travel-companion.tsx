import Layout from '../components/Layout';

export default function TravelCompanion() {
  return <div>Travel companion</div>;
}

TravelCompanion.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
