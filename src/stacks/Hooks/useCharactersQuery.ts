import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCharactersQuery = () => {
  return useInfiniteQuery({
    queryKey: ['characters'],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get(`https://rickandmortyapi.com/api/character?page=${pageParam}`)
        .then(res => res.data),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const next = lastPage.info?.next;
      if (!next) return undefined;
      const match = next.match(/page=(\d+)/);
      return match ? Number(match[1]) : undefined;
    },
  });
};
