import { useEffect } from 'react';

export default function CloseWindow() {
  useEffect(() => {
    window.addEventListener('message', (event) =>
      event.source?.postMessage('close me')
    );
  }, []);
}

CloseWindow.getLayout = (page: JSX.Element) => <>{page}</>;
