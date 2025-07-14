import Link from 'next/link';
import Button from '@/components/Button';

function HistoryViewCard({ btnText, title, icon, link }) {
  return (
    <div className="relative border border-[#E4E4E2] bg-white backdrop-blur-[17.5px] w-full px-4 py-5 overflow-hidden rounded-[16px]">
      <div className="absolute w-[100px] h-[100px] bg-primary/20 blur-[140px] top-[-7px] left-[281px] hidden"></div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-black ">
            {icon}
          </div>
          <div className="text-[16px] leading-6 font-normal text-black">
            {title}
          </div>
        </div>
        <Link href={link}>
          <div>{btnText}</div>
        </Link>
      </div>
    </div>
  );
}

export default HistoryViewCard;
