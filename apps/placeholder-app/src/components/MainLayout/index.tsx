import React, { FC } from 'react';

interface Props {
  PageContent: React.FC;
}

const Layout: FC<Props> = ({ PageContent }) => {
  return <PageContent />;
};

export default Layout;
