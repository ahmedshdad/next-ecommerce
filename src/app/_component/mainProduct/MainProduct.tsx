import getAllProducts from '@/Api/product.Api'
import { ProductType } from '@/type/products.type'
import React from 'react'
import Product from '../productCarts/Product'

export default async function MainProduct( ) {
     const allProduct:ProductType[] = await  getAllProducts()



  return <>
  
  <div className='py-8  grid grid-cols-2  md:grid-cols-3 gap-4   lg:grid-cols-4 xl:grid-cols-5 '>
{allProduct.map((product)=> <Product key={product._id} product={product}/> )}
</div>
  
  </>
}
