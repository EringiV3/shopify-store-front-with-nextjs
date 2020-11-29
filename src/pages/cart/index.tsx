import { CartProducts } from '@/components/cart';
import { useCart } from '@/hooks/cart/useCart';
import { Layout } from '@/components/layout';

const CartTopPage: React.FC = () => {
  const { cart, fetchCart } = useCart(null);
  fetchCart();
  return (
    <Layout title="カートトップ">
      <h1>ショッピングカート</h1>
      {cart === null ? <div>loading...</div> : <CartProducts cart={cart} />}
    </Layout>
  );
};

export default CartTopPage;
