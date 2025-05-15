import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Character } from '../Types/Character';
import { useFavorites } from '../contexts/FavoritesContext';
import FullStar from '../../assets/star.png';
import EmptyStar from '../../assets/empty_star.png';
import { useFonts } from 'expo-font';

interface Props {
  character: Character;
  onPress: () => void;
}

const CharacterCard = ({ character, onPress }: Props) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(character.id);

  const [fontsLoaded] = useFonts({
    'Inter': require('../../assets/fonts/Inter.ttf'),
    'DMMono': require('../../assets/fonts/DMMono.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardShadowWrapper}>
        <View style={styles.card}>
          <View style={styles.infoSection}>
            <Text style={[styles.label, { fontFamily: 'DMMono' }]}>NAME</Text>
            <Text style={[styles.value, { fontFamily: 'Inter' }]}>{character.name}</Text>
            <Text style={[styles.label, { fontFamily: 'DMMono' }]}>STATUS</Text>
            <Text style={[styles.value, { fontFamily: 'Inter' }]}>{character.status}</Text>
            <Text style={[styles.label, { fontFamily: 'DMMono' }]}>SPECIES</Text>
            <Text style={[styles.value, { fontFamily: 'Inter' }]}>{character.species}</Text>
          </View>

          <TouchableOpacity style={styles.imageSection} onPress={onPress} activeOpacity={1}>
            <Image source={{ uri: character.image }} style={styles.avatar} />
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => toggleFavorite(character)}
              activeOpacity={1}>
              <Image
                source={favorite ? FullStar : EmptyStar}
                style={styles.starIcon}
              />
              <Text style={[styles.likeText, { fontFamily: 'DMMono' }]}>LIKE</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  cardShadowWrapper: {
    shadowColor: '#10331D',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
    backgroundColor: 'transparent',
    borderRadius: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#10331D',
    padding: 20,
  },
  infoSection: {
    flex: 1,
    justifyContent: 'center',
  },
  imageSection: {
    marginLeft: 16,
    position: 'relative',
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#10331D',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    position: 'absolute',
    bottom: 8,
    right: 8,
    borderWidth: 1,
    borderColor: '#10331D',
  },
  starIcon: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
  likeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  label: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
    marginTop: 6,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
    color: '#000',
  },
});

export default CharacterCard;
