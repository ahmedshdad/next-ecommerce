'use client'

import React, { useEffect, useState } from 'react'

export default function Page() {
  const [orders, setOrders] = useState<any[]>([])  
  const [loading, setLoading] = useState(true)

  async function getOrders() {
    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/', {
        cache: "no-store"  
      })
      const data = await response.json()
      console.log(data)
      setOrders(data?.data || data) 
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div className="p-6">
      <title>Orders</title>

      {loading ? (
        <div className='flex justify-center items-center h-screen'>
          <i className="text-green-500 fa-3x fa-solid fa-spinner fa-spin-pulse"></i>
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-red-500 font-medium">No orders found</p>
      ) : (
        <>
          <h2 className="text-green-600 text-2xl font-bold text-center mb-6">
            My Orders
          </h2>

          {/* ✅ Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <thead className="bg-green-50 text-green-700">
                <tr>
                  <th className="px-4 py-3 text-center border-r">Order ID</th>
                  <th className="px-4 py-3 text-center border-r">Total Price</th>
                  <th className="px-4 py-3 text-center border-r">Payment</th>
                  <th className="px-4 py-3 text-center border-r">Date</th>
                  <th className="px-4 py-3 text-center">Items</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order: any, index: number) => (
                  <tr 
                    key={order._id} 
                    className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}
                  >
                    <td className="text-center px-4 py-2">{order._id}</td>
                    <td className="text-center px-4 py-2 font-semibold text-green-600">
                      💰 {order.totalOrderPrice} EGP
                    </td>
                    <td className="text-center px-4 py-2">{order.paymentMethodType}</td>
                    <td className="text-center px-4 py-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-center px-4 py-2">
                      🛒 {order.cartItems?.length || 0} Items
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Mobile Cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {orders.map((order: any) => (
              <div 
                key={order._id} 
                className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
              >
                <p className="text-sm text-gray-500">Order ID: 
                  <span className="font-medium text-gray-800"> {order._id}</span>
                </p>
                <p className="text-green-600 font-semibold mt-2">
                  💰 {order.totalOrderPrice} EGP
                </p>
                <p className="text-sm text-gray-600">Payment: {order.paymentMethodType}</p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  🛒 {order.cartItems?.length || 0} Items
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
