'use server'

import getMyToken from "@/utilites/getMyToken"

 export default async function addToCart(id : string){


    const token = await getMyToken()
    if(!token){
      throw new Error ('Please login before add to cart')
    }

 const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart',{

 method: 'post' ,
 body:JSON.stringify({
    
    productId: id

 }),
 headers:{
  token : `${token}`,
  'Content-Type':'application/json'
 }

 }) 
 const data = response.json()
 return data
 
 }



 export async function getProductFromCart(){
 const token = await getMyToken()
  
  const response =  await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
   headers :{
      token : `${token}`,
   }
   })

   const data = response.json()
return data
 }


 export async function removeFromCart(id : string){
 const token = await getMyToken()
  
  const response =  await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
   method : 'delete',
   headers :{
   token : `${token}`,
   }
   })

   const data = response.json()
return data
 }



 export async function updateItemCount(id : string , newCount: number) {
 const token = await getMyToken()
  
  const response =  await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
   method : 'put',
   body : JSON.stringify({
    count : String(newCount)
   }) ,

   headers :{
    token : `${token}`,
      "Content-type": "application/json"
   }
   })

   const data = response.json()
return data
 }





 export async function clearCart(){
 const token = await getMyToken()
  
  const response =  await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
   method : 'delete',
   headers :{
     token : `${token}`,
   }
   })

   const data = response.json()
return data
 }