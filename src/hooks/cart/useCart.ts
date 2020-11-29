import { Cart } from '@/types';
import { useState, useEffect } from 'react';
import { client } from '@/shopify/client';
import { getCheckoutId, setCheckoutId } from '@/utils/helpers';

type useCartInterface = {
  cart: Cart | null;
  changeQuantity: (skuId: string, quantity: string) => void;
  removeProduct: (productId: string) => void;
  addToCart: (skuId: string | number) => Promise<Cart>;
  fetchCart: () => void;
  initializeCart: () => void;
};

export const useCart = (originCart: Cart | null): useCartInterface => {
  const [cart, setCart] = useState<Cart | null>(originCart);

  /**
   * カート内の商品の数量をquantityに変更します
   * @param skuId
   * @param quantity
   */
  const changeQuantity = (skuId: string, quantity: string): void => {
    if (!cart) return;
    client.checkout
      // @ts-ignore
      .updateLineItems(cart.id, [{ id: skuId, quantity: parseInt(quantity) }])
      .then((cart: Cart) => {
        setCart(cart as Cart);
      });
  };

  /**
   * カートから商品を削除します
   * @param productId
   */
  const removeProduct = (productId: string): void => {
    if (!cart) return;
    client.checkout.removeLineItems(cart.id, [productId]).then((cart) => {
      setCart(cart as Cart);
    });
  };

  /**
   * カートに商品を追加する
   * @param skuId
   */
  const addToCart = (skuId: string | number): Promise<Cart> => {
    return client.checkout.addLineItems(getCheckoutId(), [
      {
        variantId: skuId,
        quantity: 1,
      },
    ]) as Promise<Cart>;
  };

  /**
   * カートを取得します
   */
  const fetchCart = () => {
    useEffect(() => {
      const checkoutId = getCheckoutId();
      if (!checkoutId) return;
      client.checkout.fetch(checkoutId).then((cart) => setCart(cart as Cart));
    }, []);
  };

  /**
   * カートを初期化します
   */
  const initializeCart = () => {
    useEffect(() => {
      const checkoutId = getCheckoutId();
      if (checkoutId) return;
      client.checkout.create().then((cart) => {
        setCheckoutId(cart.id);
      });
    }, []);
  };

  return {
    cart,
    changeQuantity,
    removeProduct,
    addToCart,
    fetchCart,
    initializeCart,
  };
};
