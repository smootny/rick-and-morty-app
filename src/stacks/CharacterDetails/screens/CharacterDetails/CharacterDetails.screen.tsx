import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { CharacterDetailsStackParamList } from '../../CharacterDetails.routes';
import { MainStackNavigationProp } from '../../../Main/Main.routes';
import { useFavorites } from '../../../../contexts/FavoritesContext';
import FullStar from '../../../../../assets/star.png';
import EmptyStar from '../../../../../assets/empty_star.png';

const CharacterDetailsScreen = () => {
  const route = useRoute<
    RouteProp<CharacterDetailsStackParamList, 'CharacterDetailsScreen'>
  >();
  const { character } = route.params;
  const navigation = useNavigation<MainStackNavigationProp>();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(character.id);

  const handleToggleFavorite = () => {
    toggleFavorite(character);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Go back to Characters List</Text>
      </TouchableOpacity>

      <View style={styles.cardShadow}>
        <View style={styles.card}>
          <Image source={{ uri: character.image }} style={styles.image} />
          <Text style={styles.label}>NAME</Text>
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
            style={[styles.likeButton, favorite && styles.likedButton]}
            onPress={handleToggleFavorite}
            activeOpacity={0.9}
          >
            <View style={styles.likeButtonContent}>
              <Image
                source={favorite ? FullStar : EmptyStar}
                style={styles.starIcon}
              />
              <Text style={styles.likeButtonText}>
                {favorite ? 'REMOVE FROM LIKED' : 'ADD TO LIKED'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F4F6F4',
    flexGrow: 1,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: '#162C1B',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  cardShadow: {
    shadowColor: '#10331D',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    backgroundColor: 'transparent',
    borderRadius: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#10331D',
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#10331D',
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontFamily: 'DMMono',
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#162C1B',
    fontFamily: 'Inter',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  gridItem: {
    backgroundColor: '#F4F6F4',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    fontFamily: 'Inter',
  },
  likeButton: {
    backgroundColor: '#162C1B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  likedButton: {
    backgroundColor: '#11B0C8',
  },
  likeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: '#fff',
  },
  likeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'DMMono',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default CharacterDetailsScreen;