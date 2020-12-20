import { GetStaticProps, GetStaticPaths } from 'next';
import { client } from '@/shopify/client';
import { ProductDetail } from '@/components/product';
import { Product } from '@/types';
import { Layout } from '@/components/layout';
import { NextSeo } from 'next-seo';

type Props = {
  product: Product;
  errors?: any;
};

const ProductDetailPage: React.FC<Props> = ({ product, errors }) => {
  if (!product) return <div>loading...</div>;
  if (errors) return <div>error</div>;
  return (
    <>
      <NextSeo
        title={product.title}
        description={`${product.description.substr(0, 70)}...`}
        noindex={true}
        nofollow={true}
        openGraph={{
          images: [
            {
              url: product.images[0].src,
              width: 500,
              height: 500,
              alt: `${product.description.substr(0, 70)}...`,
            },
          ],
        }}
      />
      <Layout title={product.title}>
        <ProductDetail product={product} />
      </Layout>
    </>
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
      revalidate: 600,
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
