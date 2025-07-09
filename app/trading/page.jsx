import Navbar from '@/components/navbar/navbar'
import Trades from '@/features/Trades'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>

      <div className='wrapper mb-32'>
        <Trades/>
      </div>
    </div>
  )
}

export default page
