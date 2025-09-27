 

import { removeFromCart, updateItemCount } from '@/Api/cart.api'

import { CartProductType } from '@/type/cart.type'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
import { cartContext } from '../context/cart.context'

export default function CartItem({ product }: { product: CartProductType }) {
const [isLoading , setIsLoading] = useState(false)
const  context = useContext(cartContext)
async function handleDelete() {
    
        setIsLoading(true)
    try {
      const data = await removeFromCart(product.product.id)
 
if (data.status == 'success') {
   
  toast.success('Product removed successfully')
  context?.handleCart()
}

 
    } catch (error) {
      toast.error('can`t remove')


    } finally {
    setIsLoading(false)
    }
  }



   async function handleUpdateItem( newCount : number) {
    
        setIsLoading(true)
    try {
      const data = await updateItemCount(product.product.id , newCount)
 
if (data.status == 'success') {
     
  toast.success('Product Updated successfully')
     context?.handleCart()

}



    } catch (error) {
      toast.error('can`t Update')


    } finally {
    setIsLoading(false)
    }
  }





  return <>
    <div className="flex justify-between items-center border-b-2 border-slate-300 p-5">

      <div className="left-side flex gap-3">
        <div >
          <Image src={product.product.imageCover} alt={product.product.title} width={500} height={500} className='w-[100px]' />
        </div>
        <div className='space-y-2 pt-2'>
          <h3 className='text-green-500'> {product.product.title}</h3>
          <h3 className="text-green-500">Price : {product.price} x {product.count} = {product.price*product.count} EGP</h3>

          <button disabled={isLoading} onClick={handleDelete} className="p-2 text-white rounded-md bg-green-400 flex gap-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-green-100"><Trash className="text-white" /> remove</button>


        </div>


      </div>

      <div className="right-side flex  gap-2 items-center">
        <button disabled={isLoading} onClick={()=>{handleUpdateItem(product.count-1)}} className="border-1 border-green-500 px-2 rounded-md text-2xl cursor-pointer disabled:cursor-not-allowed bg "> - </button>
        <h2 >{product.count}</h2>
        <button disabled={isLoading} onClick={()=>{handleUpdateItem(product.count+1)}} className="border-1 border-green-500 px-2 rounded-md text-2xl cursor-pointer disabled:cursor-not-allowed bg "> + </button>
      </div>


    </div>
  </>
}
