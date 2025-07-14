'use client';
import Navbar from '@/components/navbar/navbar';
import Schema from '@/features/Matrix/Schema';
// import ReferralRewards from '@/features/Matrix/ReferralRewards'; // uncomment when ready
import  { useState } from 'react';



const Page = () => {
  const [activeTab, setActiveTab] = useState(0); // 0 = first tab active

  const tabList = [
    {
      label: 'Scheme',
      content: <Schema />,
    },
    {
      label: 'Referral Rewards',
      content: <div className="p-4 text-gray-600">Coming soon...</div>,
      // Replace with: <ReferralRewards /> when component is ready
    },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-6 p-4">
        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 mb-6">
          {tabList.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
                activeTab === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow">
          {tabList[activeTab].content}
        </div>
      </div>
    </>
  );
};

export default Page;
