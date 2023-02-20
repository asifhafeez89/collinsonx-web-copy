import React from 'react'
import Layout from '../components/Layout';
import {SysAuth, Logout} from '@collinsonx/utils/components';

export default function Home() {
  return <SysAuth>
    <Logout />
  </SysAuth>
}

Home.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
