import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MainStack } from './src/stacks/Main';

const queryClient = new QueryClient();

import { FavoritesProvider } from './src/contexts/FavoritesContext';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}


