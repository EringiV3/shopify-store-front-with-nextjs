import { GetServerSideProps } from 'next';
import { Product } from '@/types';
import { Layout } from '@/components/layout';
import { SearchResult } from '@/components/product';
import { client } from '@/shopify/client';
import { NextSeo } from 'next-seo';

type Props = {
  products: Product[];
};

const ProductListPage: React.FC<Props> = ({ products }) => {
  return (
    <>
      <NextSeo
        title="商品一覧"
        description="商品一覧ページです。"
        noindex={true}
        nofollow={true}
      />
      <Layout>
        <SearchResult products={products} />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products: Product[] = await client.product.fetchAll();
  return {
    props: {
      // SerializableErrorの回避のため
      // @see https://github.com/vercel/next.js/issues/11993
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};

export default ProductListPage;
