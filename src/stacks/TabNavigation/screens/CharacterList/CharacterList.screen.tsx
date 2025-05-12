import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { styles } from './CharacterList.styled';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '../../../Main/Main.routes';
import { useCharactersQuery } from '../../../Hooks/useCharactersQuery';
import { Character } from '../../../../Types/Character';
import Logo from '../../../../../assets/Nav.png';
import { useDebouncedValue } from '../../../Hooks/useDebouncedValue';

const CharacterListScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebouncedValue(searchTerm.trim(), 200);
  const { navigate } = useNavigation<MainStackNavigationProp>();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useCharactersQuery();

  const allCharacters = data?.pages.flatMap(page => page.results) || [];

  const characters = useMemo(() => {
    if (debouncedSearch.length === 0) return allCharacters;
  
    return allCharacters.filter(char =>
      char.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [allCharacters, debouncedSearch]);
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage && !debouncedSearch) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }: { item: Character }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigate('CharacterDetailsStack', {
          screen: 'CharacterDetailsScreen',
          params: { character: item },
        })
      }>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>
          {item.status} • {item.species}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const ListHeaderComponent = useMemo(() => (
    <>
      <Image
        source={Logo}
        style={{
          width: '100%',
          aspectRatio: 4.5,
          resizeMode: 'contain',
          marginBottom: 16,
        }}
      />
      <TextInput
        placeholder="Search characters..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={{
          backgroundColor: '#eee',
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          fontSize: 16,
          marginBottom: 16,
        }}
      />
    </>
  ), [searchTerm]);

  const ListEmptyComponent = useMemo(() => {
    if (isLoading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.loaderContainer}>
          <Text style={{ color: 'red', padding: 16 }}>
            {(error as Error)?.message || 'Something went wrong'}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.loaderContainer}>
        <Text>No characters found.</Text>
      </View>
    );
  }, [isLoading, isError, error]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyboardShouldPersistTaps="always"
        data={characters}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator style={{ margin: 16 }} /> : null
        }
      />
    </View>
  );
};

export default CharacterListScreen;