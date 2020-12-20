import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.config';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo {...SEO} />
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
};

export default App;
