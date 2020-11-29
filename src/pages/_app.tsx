import { AppProps } from 'next/app';
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
      <Component {...pageProps} />
    </>
  );
};

export default App;
