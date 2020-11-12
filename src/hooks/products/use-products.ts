import { client } from '../../shopify/client';
import { Product } from '@/types';

// 引数で絞り込みパラメータを受け取れるようにする
export const useProducts = (): Promise<Product[]> => {
  return client.product.fetchAll();
};
