import { GetStaticProps, GetStaticPaths } from 'next';
import { client } from '@/shopify/client';
import { ProductDetail } from '@/components/product';
import { Product } from '@/types';
import { Layout } from '@/components/layout';

type Props = {
  product: Product;
  errors?: any;
};

const ProductDetailPage: React.FC<Props> = ({ product, errors }) => {
  if (!product) return <div>loading...</div>;
  if (errors) return <div>error</div>;
  return (
    <Layout title={product.title}>
      <ProductDetail product={product} />
    </Layout>
  );
};

export default ProductDetailPage;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    if (!id) throw new Error('idが取得できません');
    const product = await client.product.fetch(id as string);
    return {
      props: { product: JSON.parse(JSON.stringify(product)) },
      revalidate: 1,
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
