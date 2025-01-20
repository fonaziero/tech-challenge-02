import { MutableRefObject } from 'react';

export const handleScroll = (
  containerRef: MutableRefObject<HTMLDivElement | null>,
  loading: boolean,
  hasMore: boolean,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
  limit: number
) => {
  if (!containerRef.current || loading || !hasMore) return;

  const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    setOffset((prevOffset) => prevOffset + limit);
  }
};
