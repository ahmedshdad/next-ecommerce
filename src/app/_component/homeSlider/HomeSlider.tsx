'use client'
import Image from 'next/image'
import image1 from '../../images/slider-image-1.jpeg'
import image2 from '../../images/slider-image-2.jpeg'
import image3 from '../../images/slider-image-3.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import React from 'react'

export default function HomeSlider() {
  return (
    <>
      <div className="flex py-8 gap-4">
        {/* Slider */}
        <div className="w-2/3">
          <Swiper slidesPerView={1} loop={true}>
            <SwiperSlide>
              <Image
                src={image1}
                alt="image1"
                className="h-[400px] w-full object-cover rounded-md"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={image2}
                alt="image2"
                className="h-[400px] w-full object-cover rounded-md"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={image3}
                alt="image3"
                className="h-[400px] w-full object-cover rounded-md"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Side Images */}
        <div className="w-1/3 flex flex-col gap-4">
          <Image
            src={image2}
            alt="image2"
            className="h-[192px] w-full object-cover rounded-md"
          />
          <Image
            src={image3}
            alt="image3"
            className="h-[192px] w-full object-cover rounded-md"
          />
        </div>
      </div>
    </>
  )
}
