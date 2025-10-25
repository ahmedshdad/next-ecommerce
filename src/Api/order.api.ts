'use server'

import getMyToken from '@/utilites/getMyToken'
import { jwtDecode } from 'jwt-decode'

export async function getUserOrders() {
  const token = await getMyToken()
  if (!token) throw new Error('User not logged in')

  const decoded: any = jwtDecode(token)
  const userId = decoded?.id || decoded?._id
  if (!userId) throw new Error('User ID not found in token')

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
    headers: { token },
    cache: 'no-store',
  })

  if (!res.ok) throw new Error('Failed to fetch user orders')

  const data = await res.json()
  return data
}
