import { Product } from '@/types';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { useState } from 'react';

SwiperCore.use([Navigation, Pagination]);

type Props = {
  product: Product;
};

const ProductImages: React.FC<Props> = ({ product }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const slideTo = (index: number) => {
    if (!swiperInstance) return;
    swiperInstance.slideTo(index);
  };
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
      >
        {product.images.map((image) => {
          return (
            <SwiperSlide key={image.id}>
              <Image
                src={image.src}
                alt={product.title}
                width={500}
                height={500}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {product.images.map((image, index) => {
        return (
          <Image
            onClick={() => slideTo(index)}
            key={image.id}
            src={image.src}
            alt={product.title}
            width={100}
            height={100}
          />
        );
      })}
    </>
  );
};

export default ProductImages;
