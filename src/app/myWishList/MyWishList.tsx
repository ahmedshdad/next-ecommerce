 'use client'
 
 import { addToWishList } from '@/Api/wishlist.api'
 import { Heart } from 'lucide-react'
 import React from 'react'
 import { toast } from 'sonner'
 
 export default function WishList({ id }: { id: string }) {
 
   
  
   async function handleAddToWishList() {
 
   
       const data = await addToWishList(id)
  
       if(data.status == 'success') {
          toast.success(data.message) 
       }
       else{
         toast.error( 'can`t')
       }
    
   }
 
 
   return  <>
         < Heart  onClick={ handleAddToWishList}  className=' h-8 w-8 rounded-full text-white hover:bg-white hover:text-green-600 transition-all p-1 cursor-pointer '/>
 
   </>
 }