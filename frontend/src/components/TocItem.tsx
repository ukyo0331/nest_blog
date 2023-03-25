import { FC } from 'react';
import Link from 'next/link';

type TocItemProps = {
  text: string;
  active: boolean;
  id: string;
  onClick(id: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
};

const TocItem: FC<TocItemProps> = (
  { id, text, active, onClick }
) => {
  return (
    <div className='flex items-center'>
      <span className={`block w-1 h-full ${true && 'bg-blue-400 rounded'}`}/>
      <Link
        href={`#${id}`}
        className={`${active && 'text-amber-700'} pl-3 hover:brightness-125 hover:capitalize hover:transition-colors`}
        onClick={(e) => onClick(id, e)}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  )
}

export default TocItem;