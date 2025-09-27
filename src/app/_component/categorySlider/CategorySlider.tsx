 import getCategory from '@/Api/category.Api'
import { CategoryType } from '@/type/products.type';
import React from 'react'
import CategorySwiper from '../categorySwiper/CategorySwiper';
 
 
 export default async function CategorySlider() {
 

   

const allCategory:CategoryType[] = await getCategory()


 
 

   return  <>
   
   <h2 className='text-3xl font-semibold '     >All Categories</h2>
   <CategorySwiper allCategory={allCategory}/>
   
   
   
   
   
   
   </>
 }
 