import { Cart } from '@/types';
import { useEffect } from 'react';
import { client } from '@/shopify/client';
import { getCheckoutId, setCheckoutId } from '@/utils/helpers';
import { atom, useRecoilState, selector, useRecoilValue } from 'recoil';

type useCartInterface = {
  cart: Cart | null;
  cartItemQuantity: number;
  changeQuantity: (skuId: string, quantity: string) => void;
  removeProduct: (productId: string) => void;
  addToCart: (skuId: string | number) => Promise<void>;
  fetchCart: () => void;
};

const cartState = atom<Cart | null>({
  key: 'cartState',
  default: null,
});

const cartItemQuantityState = selector({
  key: 'cartItemQuantityState',
  get: ({ get }) =>
    get(cartState)?.lineItems.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    ) ?? 0,
});

export const useCart = (): useCartInterface => {
  const [cart, setCart] = useRecoilState(cartState);
  const cartItemQuantity = useRecoilValue(cartItemQuantityState);

  /**
   * カートを初期化します
   */
  const initializeCart = () => {
    useEffect(() => {
      const checkoutId = getCheckoutId();
      if (checkoutId) return;
      client.checkout.create().then((cart) => {
        setCart(cart as Cart);
        setCheckoutId(cart.id);
      });
    }, []);
  };

  initializeCart();

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
  const addToCart = (skuId: string | number): Promise<void> => {
    return client.checkout
      .addLineItems(getCheckoutId(), [
        {
          variantId: skuId,
          quantity: 1,
        },
      ])
      .then((cart) => setCart(cart as Cart));
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

  return {
    cart,
    cartItemQuantity,
    changeQuantity,
    removeProduct,
    addToCart,
    fetchCart,
  };
};
