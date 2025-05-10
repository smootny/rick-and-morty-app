import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCharacters = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${pageParam}`,
  );
  return response.data;
};

export const useCharactersQuery = () => {
  return useInfiniteQuery({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const next = lastPage.info?.next;
      if (!next) return undefined;
      const url = new URL(next);
      return Number(url.searchParams.get('page'));
    },
  });
};
