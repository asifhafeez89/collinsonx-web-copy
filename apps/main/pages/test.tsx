import React from 'react'
import LayoutLogin from '../components/LayoutLogin';
import {SysAuth, Logout} from '@collinsonx/utils/components';

export default function Home() {
  return <SysAuth>
    <Logout />
  </SysAuth>
}

Home.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;
