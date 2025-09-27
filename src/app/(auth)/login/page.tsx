'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema, loginType } from '@/schemas/register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { signIn, SignInResponse } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function Login() {
  const [isPassword, setIsPassword] = useState(true)

  const myForm = useForm<loginType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
    mode: 'all',
  })

  async function handlelogin(values: loginType) {
    const response: SignInResponse | undefined = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: '/',
    })

    if (response?.ok) {
      toast.success('Logged in successfully')
      window.location.href = '/'
    } else {
      toast.error(response?.error)
    }
  }

  return (
    <>
      <title>Login</title>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Login Now</h2>

          <Form {...myForm}>
            <form onSubmit={myForm.handleSubmit(handlelogin)} className="space-y-5">
              {/* Email */}
              <FormField
                control={myForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your email" className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
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
                          className="w-full pr-10"
                        />
                        {isPassword ? (
                          <Eye
                            onClick={() => setIsPassword(false)}
                            className="absolute top-2.5 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
                          />
                        ) : (
                          <EyeOff
                            onClick={() => setIsPassword(true)}
                            className="absolute top-2.5 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className=" w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium transition cursor-pointer"
                >
                  Login
                </button>
              </div>

              <div className="text-center">
                <Link className="text-blue-500 hover:underline text-sm" href={'/forgetPassword'}>
                  Forgot Password?
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
