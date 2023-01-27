import Layout from '../components/Layout';

export default function ExploreLounges() {
  return <div>Explore Lounges</div>;
}

ExploreLounges.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
