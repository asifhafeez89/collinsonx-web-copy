import Layout from '../components/Layout';

export default function Profile() {
  return <div>Profile</div>;
}

Profile.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
