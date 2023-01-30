import Layout from '../components/Layout';

export default function Landing() {
  return <div>Landing</div>;
}

Landing.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
