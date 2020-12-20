import React, { ReactNode } from 'react';
import Head from 'next/head';

import { Header, Footer } from '@/components/layout';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({ children }) => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
