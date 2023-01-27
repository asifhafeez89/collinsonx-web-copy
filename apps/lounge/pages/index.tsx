import { useRouter } from 'next/router';
import LayoutLogin from '../components/LayoutLogin';

export default function Landing() {
  const router = useRouter();

  return <>Landing</>;
}

Landing.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;
