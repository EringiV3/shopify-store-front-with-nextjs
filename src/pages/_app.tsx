import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { client } from '@/shopify/client';
import { getCheckoutId, setCheckoutId } from '@/utils/helpers';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const checkoutId = getCheckoutId();
    if (checkoutId) return;
    client.checkout.create().then((cart) => {
      setCheckoutId(cart.id);
    });
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" /> */}
        {/* <link rel="manifest" href="/manifest.json" /> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
