
'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Product from '../productCarts/Product';
import { ProductType } from '@/type/products.type';
 
 
 export default function ProductSwiper({relatedProducts}:{relatedProducts:ProductType[]}) {



   return  <>
   
    <Swiper
       breakpoints={{
          320: { slidesPerView: 2},
      
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
     spaceBetween={20}
     loop={false}
    >

   {relatedProducts.map((product)=>    <SwiperSlide key={product._id}>  <Product product={product}/> </SwiperSlide> )}

    </Swiper>
   
   
   </>
 }
 