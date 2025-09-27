'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { resetPasswordSchema, resetPasswordType } from '@/schemas/register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ResetPassword() {
  const [isPassword, setIsPassword] = useState(true)
  const router = useRouter()

  const myForm = useForm<resetPasswordType>({
    defaultValues: {
      email: '',
      newPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
    mode: 'all',
  })

  async function handleresetPassword(values: resetPasswordType) {
    const loading = toast.loading('loading')
    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        method: 'put',
        data: values,
      }

      const { data } = await axios.request(options)
      console.log(data)

      toast.success('Password Changed')
      router.push('/login')
    } catch (error: any) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
    } finally {
      toast.dismiss(loading)
    }
  }

  return (
    <>
      <title>Reset Password</title>
      <div className="w-full lg:w-2/3 mx-auto h-screen flex items-center justify-center p-5">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-3xl font-semibold text-center mb-6 text-green-600">
            Reset Password
          </h2>

          <Form {...myForm}>
            <form
              onSubmit={myForm.handleSubmit(handleresetPassword)}
              className="space-y-4"
            >
              {/* Email */}
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

              {/* New Password */}
              <FormField
                control={myForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={isPassword ? 'password' : 'text'}
                          placeholder="Enter new password"
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

              <button
                type="submit"
                className="w-full bg-green-600 p-3 text-white rounded-md cursor-pointer hover:bg-green-700 transition"
              >
                Reset Password
              </button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
