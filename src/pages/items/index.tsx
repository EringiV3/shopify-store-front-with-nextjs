import { GetServerSideProps } from 'next';
import { Product } from '@/types';
import { useProducts } from '@/hooks/products/use-products';

import { SearchResult } from '@/components/product';

type Props = {
  products: Product[];
};

const ProductListPage: React.FC<Props> = ({ products }) => {
  return <SearchResult products={products} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products: Product[] = await useProducts();
  return {
    props: {
      // SerializableErrorの回避のため
      // @see https://github.com/vercel/next.js/issues/11993
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};

export default ProductListPage;
