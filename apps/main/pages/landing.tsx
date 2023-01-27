import { useRouter } from 'next/router';
import LayoutLogin from '../components/LayoutLogin';

export default function Home() {
  const router = useRouter();

  return <>Landing</>;
}

Home.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;
