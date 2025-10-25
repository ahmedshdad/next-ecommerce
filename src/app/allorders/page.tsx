'use client'

import { getUserOrders } from '@/Api/order.api'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getUserOrders()
        setOrders(data)
      } catch (err: any) {
        toast.error(err.message || 'Failed to fetch orders')
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [])

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <i className="text-green-500 fa-3x fa-solid fa-spinner fa-spin-pulse"></i>
    </div>
  )

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto overflow-x-auto">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-gray-500 text-center text-lg py-10">
          No orders found.
        </div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-green-100">
            <tr>
              <th className="border border-gray-300 px-3 py-2">Order ID</th>
              <th className="border border-gray-300 px-3 py-2">Date</th>
              <th className="border border-gray-300 px-3 py-2">Payment</th>
              <th className="border border-gray-300 px-3 py-2">Total Price</th>
              <th className="border border-gray-300 px-3 py-2">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order._id} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2 break-all">{order._id}</td>
                <td className="border border-gray-300 px-3 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-3 py-2 capitalize">{order.paymentMethodType}</td>
                <td className="border border-gray-300 px-3 py-2 text-green-600 font-bold">{order.totalOrderPrice} EGP</td>
                <td className="border border-gray-300 px-3 py-2 text-center">{order.cartItems?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
