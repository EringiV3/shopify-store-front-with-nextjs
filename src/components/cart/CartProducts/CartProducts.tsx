import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import { SelectedOption, Cart } from '@/types';
import Button from '@material-ui/core/Button';
import { client } from '@/shopify/client';
import { useState } from 'react';
import Link from '@material-ui/core/Link';

type Props = {
  cart: Cart;
};

const CartProducts: React.FC<Props> = (props) => {
  const [cart, setCart] = useState<Cart>(props.cart);

  const getValueByMatchedNameSelectedOptions = (
    options: SelectedOption[],
    name: string
  ): string => {
    return options.find((option) => option.name === name)?.value ?? '';
  };

  const changeQuantity = (skuId: string, quantity: string) => {
    console.log(client.checkout);
    client.checkout
      .updateLineItems(cart.id, [{ id: skuId, quantity: parseInt(quantity) }])
      .then((cart) => {
        console.log({ cart });
        setCart(cart as Cart);
      });
  };

  const removeProduct = (id: string) => {
    client.checkout.removeLineItems(cart.id, [id]).then((cart) => {
      console.log({ cart });
      setCart(cart as Cart);
    });
  };
  return (
    <>
      <h1>ショッピングカート</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          cart products
          {cart.lineItems.map((product) => (
            <Grid container spacing={3} key={product.id}>
              <Grid item xs={3}>
                <Image
                  src={product.variant.image.src}
                  alt={product.variant.image.altText ?? ''}
                  width={300}
                  height={300}
                />
              </Grid>
              <Grid item xs={4}>
                <div>商品名: {product.title}</div>
                <div>
                  カラー:{' '}
                  {getValueByMatchedNameSelectedOptions(
                    product.variant.selectedOptions,
                    'Color'
                  )}
                </div>
                <div>
                  サイズ:{' '}
                  {getValueByMatchedNameSelectedOptions(
                    product.variant.selectedOptions,
                    'Size'
                  )}
                </div>
              </Grid>
              <Grid item xs={3}>
                <span>
                  ${parseInt(product.variant.price) * product.quantity}
                </span>
                <select
                  defaultValue={product.quantity}
                  onChange={(e) => changeQuantity(product.id, e.target.value)}
                >
                  {[...Array(5).keys()].map((number) => {
                    const value = number + 1;
                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </Grid>
              <Grid item xs={2}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => removeProduct(product.id)}
                >
                  削除
                </Link>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} lg={4}>
          <div>合計: ${cart.subtotalPrice}(税抜)</div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.open(cart.webUrl)}
          >
            購入する
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CartProducts;
