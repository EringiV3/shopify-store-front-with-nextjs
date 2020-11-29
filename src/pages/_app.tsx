import { AppProps } from 'next/app';
import { useCart } from '@/hooks/cart/useCart';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { initializeCart } = useCart(null);
  initializeCart();
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
