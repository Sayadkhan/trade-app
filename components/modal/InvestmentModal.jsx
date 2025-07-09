'use client';

import React, { useState, useEffect } from 'react';
import { XCircle } from 'lucide-react';
import { investmentNow } from '@/actions/investment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toaster from '../Toaster';

const InvestmentModal = ({ plan, onClose }) => {
  if (!plan) return null;

  const queryClient = useQueryClient();
  const isFixedAmount = plan.amount > 0;

  const [amount, setAmount] = useState(isFixedAmount ? plan.amount : '');
  const [error, setError] = useState('');
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');

  const min = plan.minimum;
  const max = plan.maximum;

  useEffect(() => {
    if (isFixedAmount) {
      setError('');
      return;
    }

    const numeric = Number(amount);
    if (amount === '') {
      setError('');
    } else if (isNaN(numeric)) {
      setError('Amount must be a number.');
    } else if (numeric < min) {
      setError(`Minimum investment is $${min}.`);
    } else if (numeric > max) {
      setError(`Maximum investment is $${max}.`);
    } else {
      setError('');
    }
  }, [amount, min, max, isFixedAmount]);

  const {
    mutate: investNowMutate,
    isPending,
    status,
  } = useMutation({
    mutationFn: investmentNow,
    onSuccess: (data) => {
      setToasterOpen(true);
      setToasterMessage(data.message || 'Investment successful.');
      onClose();
      queryClient.invalidateQueries({ queryKey: ['investments-statistics'] });
    },
    onError: (error) => {
      setToasterOpen(true);
      const message = error?.response?.data?.message || 'Something went wrong';
      setToasterMessage(message);
    },
  });

  const handleInvest = () => {
    investNowMutate({
      amount: Number(amount),
      uid: plan.uid,
    });
  };

  const canSubmit =
    isFixedAmount || (!error && amount !== '' && !isNaN(Number(amount)));

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 sm:px-0">
        <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
          >
            <XCircle size={24} />
          </button>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Invest in {plan.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {isFixedAmount
              ? `Fixed investment: $${plan.amount}`
              : `Minimum: $${min} | Maximum: $${max}`}
          </p>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Investment Amount
            </label>
            {isFixedAmount ? (
              <input
                type="text"
                value={`$${plan.amount}`}
                disabled
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
              />
            ) : (
              <>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Between $${min} and $${max}`}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </>
            )}
          </div>

          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-6">
            <Info label="Duration" value={`${plan.duration} ${plan.time}`} />
            <Info label="Expected Returns" value={`${plan.interest_rate}%`} />
            <Info label="Total Interest" value={plan.total_investment_interest} />
          </div>

          {plan.meta?.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Highlights
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                {plan.meta.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="w-1/2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleInvest}
              disabled={!canSubmit || isPending}
              className={`w-1/2 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold transition
              ${
                !canSubmit || isPending
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:from-indigo-600 hover:to-purple-600'
              }`}
            >
              {isPending ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        </div>
      </div>

      <Toaster
        message={toasterMessage}
        type={status === 'error' ? 'error' : 'success'}
        isOpen={toasterOpen}
        onClose={() => setToasterOpen(false)}
        position="top-center"
      />
    </>
  );
};

const Info = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-500 dark:text-gray-400">{label}</span>
    <span className="font-medium text-gray-800 dark:text-white">{value}</span>
  </div>
);

export default InvestmentModal;
