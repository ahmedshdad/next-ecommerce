import { checkoutType } from "@/schemas/checkout.schema"
import getMyToken from "@/utilites/getMyToken"

 
 

 export async function makeOnlinePayment( cardId:string , domain:string ,formVAlues:checkoutType){
 
 const token = await getMyToken()

 const response =await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${domain}` ,{
     method : "post" ,
     headers: {
      token : `${token}`,
        'Content-Type':'application/json'
     } ,
  body : JSON.stringify({
  shippingAddress : formVAlues
  })



  })
const data = response.json()
return data


 }

 export async function makeCashPayment( cardId:string  ,formVAlues:checkoutType){
 
 const token = await getMyToken()

 const response =await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cardId}` ,{
     method : "post" ,
     headers: {
        token : `${token}`,
        'Content-Type':'application/json'
     } ,
  body : JSON.stringify({
  shippingAddress : formVAlues
  })



  })
const data = response.json()
return data


 }