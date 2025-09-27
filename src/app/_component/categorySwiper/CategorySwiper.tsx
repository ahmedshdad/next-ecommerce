'use client'

import 'swiper/css'
import 'swiper/css/autoplay'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { CategoryType } from '@/type/products.type'
import Image from 'next/image'
import Link from 'next/link'

export default function CategorySwiper({ allCategory }: { allCategory: CategoryType[] }) {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      grabCursor={true}
      breakpoints={{
        320: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
        1280: { slidesPerView: 6 },
      }}
    >
      {allCategory.map((category) => (
        <SwiperSlide key={category._id}>
          <Link
            href={`/Categories/${category._id}`}
            className="block text-center hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={500}
              height={500}
              className="h-[200px] w-full object-cover rounded-lg shadow"
            />
            <h3 className="mt-2 text-sm font-semibold text-green-600">{category.name}</h3>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
