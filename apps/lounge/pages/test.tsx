import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import useAuth from '../components/hooks/useAuth';

export default function Home() {
  
  const router = useRouter();
  const [ isLoggedIn, userId, logout ] = useAuth();

  const handleLogout = async () => {
    if (typeof logout === 'function') {
       await logout();
    }
    router.push({
      pathname: '/',
    });
  }

  return (
    <>
     {isLoggedIn && <div onClick={handleLogout}>Signout</div>}
    </>
  );
}

Home.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
  