import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { styles } from './FavoriteCharacters.styled';
import { useFavorites } from '../../../../contexts/FavoritesContext';
import { Character } from '../../../../Types/Character';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '../../../Main/Main.routes';

const FavoriteCharactersScreen = () => {
  const { favorites } = useFavorites();
  const { navigate } = useNavigation<MainStackNavigationProp>();

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
        <Text style={styles.status}>{item.status} • {item.species}</Text>
      </View>
    </TouchableOpacity>
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>No favorite characters yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

export default FavoriteCharactersScreen;
