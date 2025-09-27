"use client"

import React from 'react'
 import errorImage from '@/app/images/error.svg'
import Image from 'next/image'
 export default function error() {
   return (
     <div className='flex justify-center items-center h-screen'>
          <Image src={errorImage} alt="not found" width={300} height={300} />
     </div>
   )
 }
 