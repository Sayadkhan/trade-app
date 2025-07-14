import useGlobalSettings from '@/hooks/useGlobalSettings';
import Image from 'next/image';

function MarketCard({ data }) {
  const { data: globalSettings } = useGlobalSettings();

  return (
    <div className="flex justify-between items-center py-[14px] border-b border-[#E4E4E2]">
      <div className="flex items-center gap-3">
        <Image
          src={data.file}
          alt="menu-card-bg"
          width={30}
          height={30}
          className="w-[30px] h-[30px] rounded-full"
        />
        <div>
          <p className="text-sm font-medium leading-6 text-black">
            {data.name}
          </p>
          <p className="text-sm text-gray-600">
            {globalSettings?.currency_symbol}
            {data.price}
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-black text-right">
          {data.market_cap}
        </p>
        <p className="text-sm text-green-500 text-right">
          +{data.daily_high}
        </p>
      </div>
    </div>
  );
}

export default MarketCard;
