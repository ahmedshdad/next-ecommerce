import { ProductType } from '@/type/products.type'
import React from 'react'
import Link from 'next/link'
import {
  Card,
 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Eye, ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import MyButton from '@/myButton/MyButton'
 
import WishList from '@/app/myWishList/MyWishList'
 
 export default function Product({product}:{product:ProductType}) {
   return  <>
   
    <Card className='group p-2'  >
  <CardHeader >
    <CardTitle className='relative'>
 
      <Image src={product.imageCover} alt={product.title} width={500} height={500}/>
      <div className="flex justify-center items-center gap-2 layer absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all">
      <ShoppingCart  className=' h-8 w-8 rounded-full text-white hover:bg-white hover:text-green-600 transition-all p-1 cursor-pointer '/>
      
     
      <Link href={`/Products/${product._id}`}>
       <Eye  className=' h-8 w-8 rounded-full text-white hover:bg-white hover:text-green-600 transition-all p-1 cursor-pointer '/>
      </Link>
  <WishList id = { product._id}/> 

      </div>
      
      </CardTitle>


    <CardDescription className=''> {product.category.name}</CardDescription>
   
  </CardHeader>

  <CardContent>
    <p className='line-clamp-1 text-green-600 font-semibold text-lg  '>{product.title}</p>
  </CardContent> 

  <CardFooter  >
    <div className='flex justify-between items-center w-full'>
      <h4>{product.price} EGP</h4>
      <h4 className='flex gap-2 items-center'>{product.ratingsAverage}  <Star className='fill-yellow-500 text-yellow-500'/> </h4>
    </div>
  </CardFooter>
  <MyButton id={product._id}/>
</Card>
   
   
   </>
 }
 