import { useEffect, useState } from 'react';
import { getCheckoutId } from '@/utils/helpers';
import { client } from '@/shopify/client';
import { Cart } from '@/types';
import { CartProducts } from '@/components/cart';

const CartTopPage: React.FC = () => {
  const [cart, setCart] = useState<null | Cart>(null);
  useEffect(() => {
    client.checkout.fetch(getCheckoutId()).then((cart) => setCart(cart));
  }, []);
  return cart ? <CartProducts cart={cart} /> : <div>loading...</div>;
};

export default CartTopPage;
