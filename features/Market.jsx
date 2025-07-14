import useTradePredictions from "@/hooks/useTradePredictions";
import MarketCard from "./components/MarketCard";
import MarketSkeleton from "@/components/MarketSkeleton";

function Market() {
  const { data, isSuccess } = useTradePredictions({ page: 1 });

  return (
    <div className="w-full min-w-[312px]">
      <div className="relative">
        {/* Logo + Title */}
        <div className="absolute top-[-54px] left-[-1px] z-50">
          <div className="flex items-center">
            <div className="relative flex items-center justify-center">
              <div className="block">
                {/* You can replace this SVG with a light-friendly logo if needed */}
                <svg
                  width="147"
                  height="55"
                  viewBox="0 0 147 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.7227 0C8.78153 0 0.722656 8.05887 0.722656 18V50.7773C0.722656 52.1348 0.872923 53.4571 1.15773 54.7287C1.18877 54.8672 1.08417 55 0.942177 55C0.820939 55 0.722656 55.0983 0.722656 55.2195V449C0.722656 465.569 14.1541 479 30.7227 479H283.723C300.291 479 313.723 465.569 313.723 449V85C313.723 68.4315 300.291 55 283.723 55H146.828C142.121 55 138.678 50.3904 137.392 45.8618L128.088 13.0846C125.89 5.34242 118.82 0 110.772 0H18.7227Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="146" height="55" fill="white" transform="translate(0.722656)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <span className="absolute text-black text-lg left-8">
                Market
              </span>
            </div>
          </div>
        </div>

        {/* Card container */}
        <div className="bg-white mt-14 p-4 border border-gray-200 rounded-tr-[30px] rounded-b-[30px] h-full">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-700 text-xs">Coin/24h Volume</p>
            <p className="text-gray-700 text-xs">Price Cap</p>
          </div>
          {!isSuccess ? (
            <MarketSkeleton />
          ) : (
            <>
              {data?.crypto_currency
                .slice(0, 4)
                .map((item, index) => <MarketCard key={index} data={item} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Market;
