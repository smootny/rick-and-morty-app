import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {styles} from './CharacterDetails.styled';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import { CharacterDetailsStackParamList } from '../../CharacterDetails.routes';
import { MainStackNavigationProp } from '../../../Main/Main.routes';
import { useFavorites } from '../../../../contexts/FavoritesContext';
const CharacterDetailsScreen = () => {
  const route =
    useRoute<RouteProp<CharacterDetailsStackParamList, 'CharacterDetailsScreen'>>();
  const {character} = route.params;
  const navigation = useNavigation<MainStackNavigationProp>();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(character.id);
  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backText}>← Go back to Characters List</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Image source={{uri: character.image}} style={styles.image} />
        <Text style={styles.name}>{character.name}</Text>

        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>STATUS</Text>
            <Text style={styles.value}>{character.status}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>ORIGIN</Text>
            <Text style={styles.value}>{character.origin.name}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>SPECIES</Text>
            <Text style={styles.value}>{character.species}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>GENDER</Text>
            <Text style={styles.value}>{character.gender}</Text>
          </View>
        </View>

        <TouchableOpacity
  style={styles.likeButton}
  onPress={() => toggleFavorite(character)}>
  <Text style={styles.likeButtonText}>
    {favorite ? '★ REMOVE FROM LIKED' : '☆ ADD TO LIKED'}
  </Text>
</TouchableOpacity>
      </View>
    </View>
  );
};

export default CharacterDetailsScreen;
