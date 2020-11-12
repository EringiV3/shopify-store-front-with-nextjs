export type User = {
  id: number;
  name: string;
};

import {
  Option as SdkOption,
  ProductVariant as SdkProductVariant,
  Product as SdkProduct,
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
