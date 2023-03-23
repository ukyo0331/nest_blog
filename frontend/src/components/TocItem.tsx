import { FC } from 'react';

type TocItemProps = {
  text: string;
  active: boolean;
  id: string;
  onClick(id: string): void;
};

const TocItem: FC<TocItemProps> = (
  { id, text, active, onClick }
) => {
  return (
    <a
      href={`${id}`}
      className={`${active && 'text-purple-500'} hover:brightness-125 hover:capitalize hover:transition-colors hover:text-sm`}
      onClick={() => onClick(id)}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}

export default TocItem;