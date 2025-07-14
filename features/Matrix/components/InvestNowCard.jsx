'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';






import { formatToOneDecimal } from '@/utils';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import Toaster from '@/components/Toaster';
import { createMatrix } from '@/actions/matrix';

function InvestNowCard({ plan }) {
  const queryClient = useQueryClient();
  const { data } = useGlobalSettings();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const {
    mutate: matrixInvestmentMute,
    isPending,
    status,
  } = useMutation({
    mutationFn: createMatrix,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['matrix'] });
      setToasterOpen(true);
      setToasterMessage(data.message);
      setIsOpen(false);
    },
    onError: (error) => {
      setIsOpen(false);
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
    },
  });

  const handleInvest = () => {
    matrixInvestmentMute({ uid: plan.uid });
  };

  return (
    <>
      <div className="relative rounded-[30px] border border-[#E4E4E2] bg-white backdrop-blur-[17.5px] w-full p-5 space-y-4 overflow-hidden">
        <div className="absolute w-[129px] h-[136px] bg-primary blur-[140px] top-[21px] left-[148px] hidden"></div>
        <div className="flex justify-between items-center">
          <p className="text-primary text-[27px] font-semibold leading-[40.5px]">
            {data?.currency_symbol}
            {plan.amount}
          </p>
          <Button className="z-10" onClick={handleOpen}>
            Start Investing Now
          </Button>
        </div>

        <hr className="bg-[#FFFFFF12]" />
        <div>
          <p className="text-[20px] text-black">{plan.name}</p>
          <div className="flex mt-[18.5px]">
            <div className="border-l-2 border-[#ECAC31] pl-[10px]">
              <p className="text-[14px] font-medium leading-[160%] text-black">
                Straightforward Referral Reward:{' '}
                <span className="text-primary">
                  {data?.currency_symbol}
                  {plan.referral_reward}
                </span>
              </p>
              <p className="text-[14px] font-medium leading-[160%] text-black">
                Aggregate Level Commission:{' '}
                <span className="text-primary">
                  {data?.currency_symbol}
                  {plan.aggregate_level_commission}
                </span>
              </p>
              <p className="text-[14px] font-medium leading-[160%] text-black">
                Get back <span className="text-primary">{plan.get_back}%</span>{' '}
                of what you invested
              </p>
            </div>
          </div>
          <div className="w-full p-5 rounded-[10px] bg-green backdrop-blur-[12.5px] mt-5">
            <p className="text-base leading-6 mb-5 text-[#333]">What’s included</p>
            <div className="space-y-[10px]">
              {plan.level.map((level, index) => (
                <div key={index} className="flex items-center gap-[10px]">
                  <div className="min-h-[15px] min-w-[15px] flex items-center justify-center bg-primary rounded-full">
                    <TickIcon />
                  </div>
                  <div>
                    <span className="flex items-center gap-2 text-black">
                      {level.level}
                      <svg
                        width="25"
                        height="8"
                        viewBox="0 0 25 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 3.51515H0.5V4.51515H1V3.51515ZM24.5 4.51515C24.7761 4.51515 25 4.29129 25 4.01515C25 3.73901 24.7761 3.51515 24.5 3.51515V4.51515Z"
                          fill="#FFFAF3"
                        />
                      </svg>
                      {formatToOneDecimal(level.amount, 0)}x{level.matrix} ={' '}
                      {data?.currency_symbol}
                      {formatToOneDecimal(level.total, 0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <Modal size="sm" bg="default" isOpen={isOpen} onClose={handleOpen}>
          <Modal.Body>
            <p className="text-center font-medium text-[20px] text-black border-b border-[#0000001A] pb-5">
              Join {plan.name} Matrix Scheme
            </p>
            <div className="mt-5 border-b border-[#0000001A] pb-8">
              <p className="font-medium text-[18px] leading-7 text-black">
                Are you sure want to enroll in this matrix scheme?
              </p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Button loading={isPending} onClick={handleInvest}>
                Submit
              </Button>
              <Button
                onClick={handleOpen}
                type="dark"
                className="font-normal border-none"
              >
                Close
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}

      <Toaster
        message={toasterMessage}
        type={status}
        position="top-center"
        isOpen={toasterOpen}
        onClose={() => setToasterOpen(false)}
      />
    </>
  );
}

export default InvestNowCard;
