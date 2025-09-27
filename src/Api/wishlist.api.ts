import getMyToken from "@/utilites/getMyToken"
 
 
export async function addToWishList(id : string){

  const token = await getMyToken()
//    if(!token){
//        throw new Error ('Please login before add to Wishlist')
//      }

const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist' , 
    {
        method : 'POST' , 
        headers : {
           token : `${token}`,
            'Content-Type':'application/json'
        } ,
        body : JSON.stringify({
            productId:id
        }),



    }
)
 const data =await response.json()
 console.log(data);
 
  return data
  
 }

 

 

export async function getWishList() {
  const token = await getMyToken()

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "GET",
    headers: {
      token : `${token}`,
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()
  return data
}
 

export async function removeFromWishList(id: string) {
  const token = await getMyToken()

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
    method: "DELETE",
    headers: {
     token : `${token}`,
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()
  return data
}