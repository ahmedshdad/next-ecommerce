'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerSchema, registerType } from '@/schemas/register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function Register() {
  const [isPassword, setIsPassword] = useState(true)
  const router = useRouter()

  const myForm = useForm<registerType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    resolver: zodResolver(registerSchema),
    mode: 'all',
  })

  async function handleRegister(values: registerType) {
    const loading = toast.loading('Creating account...')
    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/signup',
        method: 'post',
        data: values,
      }

      const { data } = await axios.request(options)

      if (data.message === 'success') {
        toast.success('Account created successfully')
        router.push('/login')
      }
    } catch (error: any) {
      console.log(error.response?.data?.message)
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      toast.dismiss(loading)
    }
  }

  return (
    <>
      <title>Register</title>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
            Create Your Account
          </h2>

          <Form {...myForm}>
            <form
              onSubmit={myForm.handleSubmit(handleRegister)}
              className="space-y-4"
            >
              <FormField
                control={myForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your full name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={myForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={myForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={isPassword ? 'password' : 'text'}
                          placeholder="Enter your password"
                        />
                        {isPassword ? (
                          <Eye
                            onClick={() => setIsPassword(false)}
                            className="absolute top-2 right-2 cursor-pointer"
                          />
                        ) : (
                          <EyeOff
                            onClick={() => setIsPassword(true)}
                            className="absolute top-2 right-2 cursor-pointer"
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={myForm.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Confirm your password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={myForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your phone number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mt-4 transition"
              >
                Register
              </button>
            </form>
          </Form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
