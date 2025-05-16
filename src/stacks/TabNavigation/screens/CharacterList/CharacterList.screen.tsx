import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { styles } from './CharacterList.styled';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '../../../Main/Main.routes';
import { useCharactersQuery } from '../../../Hooks/useCharactersQuery';
import { Character } from '../../../../Types/Character';
import { useDebouncedValue } from '../../../Hooks/useDebouncedValue';
import CharacterCard from '../../../../components/CharacterCard';
import SearchIcon from '../../../../../assets/search.png';
import CancelIcon from '../../../../../assets/cancel.png';

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
    <CharacterCard
      character={item}
      onPress={() =>
        navigate('CharacterDetailsStack', {
          screen: 'CharacterDetailsScreen',
          params: { character: item },
        })
      }
    />
  );

  const clearSearch = () => {
    setSearchTerm('');
  };

  const ListHeaderComponent = useMemo(() => (
    <View style={localStyles.searchContainer}>
       <Text style={localStyles.title}>Characters</Text>
      <View style={localStyles.searchWrapper}>
        <Image source={SearchIcon} style={localStyles.searchIcon} />
        <TextInput
          placeholder="Search the characters"
          placeholderTextColor="#666"
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={localStyles.searchInput}
          returnKeyType="search"
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={localStyles.clearButton}>
            <Image source={CancelIcon} style={localStyles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
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

const localStyles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 6,
    paddingTop: 18,
    paddingBottom: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#162C1B',
    height: 36,
  },
  searchIcon: {
    width: 14,
    height: 14,
    marginRight: 8,
    tintColor: '#666',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    width: 16,
    height: 16,
    tintColor: '#666',
  },
  title: {
    fontSize: 36,
    fontWeight: '500',
    marginBottom: 8,
    color: '#162C1B',
    fontFamily: 'Inter',
    letterSpacing: -1,
  }
});

export default CharacterListScreen;