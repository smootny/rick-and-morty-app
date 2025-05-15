import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { styles } from './FavoriteCharacters.styled';
import { useFavorites } from '../../../../contexts/FavoritesContext';
import { Character } from '../../../../Types/Character';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '../../../Main/Main.routes';

import SearchIcon from '../../../../../assets/search.png';
import CancelIcon from '../../../../../assets/cancel.png';
import CharacterCard from '../../../../components/CharacterCard';

const FavoriteCharactersScreen = () => {
  const { favorites } = useFavorites();
  const { navigate } = useNavigation<MainStackNavigationProp>();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFavorites = useMemo(() => {
    if (!searchTerm.trim()) return favorites;
    return favorites.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [favorites, searchTerm]);

  const clearSearch = () => setSearchTerm('');

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

  const ListHeaderComponent = (
    <View style={localStyles.searchContainer}>
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
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>No favorite characters yet.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyboardShouldPersistTaps="always"
        data={filteredFavorites}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListHeaderComponent={ListHeaderComponent}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
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
    height: 48,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#666',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
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
});

export default FavoriteCharactersScreen;
