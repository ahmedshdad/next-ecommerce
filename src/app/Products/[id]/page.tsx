 
import { getPoductDetails, getRelatedProducts } from '@/Api/product.Api'
 
import ProductDetails from '@/app/_component/productDetails/ProductDetails'
import ProductSwiper from '@/app/_component/productSwiper/ProductSwiper'
import { ProductType } from '@/type/products.type'
 
 
import React from 'react'
 
 export default async function page({params}:{params : Promise<{id : string}>}) {

 const {id} = await params

 
 const productDetails:ProductType = await getPoductDetails(id)
 
 const relatedProducts:ProductType[]= await getRelatedProducts(productDetails.category._id)


 
   return < >


<div className='grid grid-cols-12 p-8 gap-5'>

  <ProductDetails productDetails={productDetails}/>
 
</div>

<h2 className='text-3xl font-semibold mb-5'> Related Products</h2>

<ProductSwiper relatedProducts={relatedProducts}/>

       
     </>
   
 }
 