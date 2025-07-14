import Navbar from '@/components/navbar/navbar'
import React from 'react'

export const metadata = {
  title: 'Matrix',
};

const page = () => {
    const tabList = [
    {
      label: 'Scheme',
      content: <Schema />,
    },
    {
      label: 'Referral Rewards',
      content: <ReferralRewards />,
    },
  ];
  return (
    <>
      <Navbar/>
   <div>
      
   </div>
    </>
  )
}

export default page
