import {
  Option as SdkOption,
  ProductVariant as SdkProductVariant,
  Product as SdkProduct,
  Cart as SdkCart,
} from 'shopify-buy';

export type Sku = {
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  image: {
    altText?: string | null;
  };
} & SdkProductVariant;

export type Option = {} & SdkOption;

export type Product = {} & SdkProduct;

export type Cart = {} & SdkCart;
