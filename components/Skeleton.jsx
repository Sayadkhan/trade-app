import { cn } from "@/utils";


const Skeleton = ({
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded-md',
  className = '',
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-slate-700',
        width,
        height,
        rounded,
        className
      )}
    />
  );
};

export default Skeleton;
