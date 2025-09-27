 import React from 'react'
 
import { Star } from 'lucide-react';
import { ProductType } from '@/type/products.type';
import MyButton from '@/myButton/MyButton';
import Image from 'next/image';

 export default function ProductDetails({productDetails}:{productDetails:ProductType}) {
   return  <>
   <div className='left-side col-span-12 md:col-span-4 p-6'>

   
    <Image src={productDetails.imageCover} alt={productDetails.description} width={500} height={500} className='w-full'/>

  </div>
  <div className='right-side col-span-12 md:col-span-8 p-6 space-y-2 flex flex-col justify-center'>
    <h2 className='text-3xl fw-semibold text-black'>{productDetails.title}</h2>
    <h3 className='text-2xl fw-semibold text-green-600'>{productDetails.category.name}</h3>
   <p>{productDetails.description}</p>

   <div className='flex justify-between items-center w-full'>
      <h4>{productDetails.price} EGP</h4>
      <h4 className='flex gap-2 items-center'>{productDetails.ratingsAverage}  <Star className='fill-yellow-500 text-yellow-500'/> </h4>
    </div>
  <MyButton id={productDetails._id}/>
  </div>
   
   
   </>

 }
 
       //<button className= 'w-full bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-white hover:text-green-600 hover:outline-2 outline-green-600'>Add To Cart</button>
