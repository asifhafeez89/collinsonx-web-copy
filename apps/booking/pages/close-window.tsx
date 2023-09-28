import { useEffect } from 'react';

export default function CloseWindow() {
  useEffect(() => {
    window.close();
  }, []);
}

CloseWindow.getLayout = (page: JSX.Element) => <>{page}</>;
