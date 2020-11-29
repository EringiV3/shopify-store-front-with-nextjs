import React, { ReactNode } from 'react';
import Head from 'next/head';

import { Header, Footer } from '@/components/layout';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="robots" content="noindex" />
    </Head>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
