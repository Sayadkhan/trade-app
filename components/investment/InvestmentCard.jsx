import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";

// investMentOpen={investMentOpen} setInvestmentOpen={setInvestmentOpen}

const InvestmentCard = ({ plan, investMentOpen, setInvestmentOpen }) => {
  if (!plan) return null;

  const investmentModal = (plan) => {
    setInvestmentOpen(plan)
  }

  return (
    <div className="bg-[#0F172A] text-white rounded-2xl shadow-lg p-6 w-full border border-gray-800 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">{plan.name}</h2>
        <span className="text-xs px-3 py-1 rounded-full bg-purple-700/20 text-purple-400">
          {plan.type === 2 ? "Growth" : "Starter"}
        </span>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        {/* Left Column */}
        <div className="space-y-2">
          <InfoRow icon="⏳" label="Duration" value={`${plan.duration} ${plan.time}`} />
          <InfoRow icon="📈" label="Returns" value={<span className="text-green-400 font-bold">{plan.interest_rate}</span>} />
          <InfoRow
            icon="🏦"
            label="Interest"
            value={
              <span
                className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                  plan.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {plan.total_investment_interest}
              </span>
            }
          />
        </div>

        {/* Right Column */}
        <div className="space-y-2">
                    
                <InfoRow
                icon="💰"
                  label="Investment"
              value={
              plan.amount > 0
                ? `$${plan.amount}`
                : `$${plan.minimum} to ${plan.maximum}`
            }
                />


          {/* Meta Highlights */}
          {plan.meta?.length > 0 && (
            <div>
              <div className="text-sm font-medium text-yellow-400 mb-1">🌟 Highlights</div>
              <ul className="space-y-1">
                {plan.meta.map((item, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-300">
                    <CheckCircle size={14} className="text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* CTA Button */}
        <button
        onClick={() => investmentModal(plan)}
        className="mt-5 w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-semibold text-white hover:from-indigo-600 hover:to-purple-600 transition-all"
        >
        Invest Now
        <ArrowRight size={16} />
        </button>

    </div>
  );
};

// InfoRow subcomponent
const InfoRow = ({ icon, label, value }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-2 text-gray-400">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
    <div className="text-right">{value}</div>
  </div>
);

export default InvestmentCard;
