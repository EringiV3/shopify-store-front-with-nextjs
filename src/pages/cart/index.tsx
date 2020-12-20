import { CartProducts } from '@/components/cart';
import { useCart } from '@/hooks/cart/useCart';
import { Layout } from '@/components/layout';
import { NextSeo } from 'next-seo';

const CartTopPage: React.FC = () => {
  const { cart, fetchCart } = useCart();
  fetchCart();
  return (
    <>
      <NextSeo
        title="カートトップ"
        description="カートトップページです。"
        noindex={true}
        nofollow={true}
      />
      <Layout>
        <h1>ショッピングカート</h1>
        {cart === null ? <div>loading...</div> : <CartProducts />}
      </Layout>
    </>
  );
};

export default CartTopPage;
