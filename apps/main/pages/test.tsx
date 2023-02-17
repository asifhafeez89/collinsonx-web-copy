import LayoutLogin from '../components/LayoutLogin';
import { useRouter } from 'next/router';
import useAuth from '@collinsonx/utils/hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, userId, logout] = useAuth({
    onExpiredSession: () => {
      router.push({
        pathname: '/',
      });
    },
  });

  const handleLogout = async () => {
    if (typeof logout === 'function') {
      await logout();
    }
    router.push({
      pathname: '/',
    });
  };

  return <>{isLoggedIn && <div onClick={handleLogout}>Signout</div>}</>;
}

Home.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;
