import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CharacterListScreen } from './screens/CharacterList';
import { FavoriteCharactersScreen } from './screens/FavoriteCharacters';
import { View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RickLogo from '../../../assets/Rick_and_Morty.png';
import CharacterIcon from '../../../assets/character.png';
import FavoriteIcon from '../../../assets/favorite_star.png';

const Tab = createBottomTabNavigator();

const TabsIcon = ({ icon, title, isFocused }: { icon: any; title: string; isFocused: boolean }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Image 
        source={icon} 
        style={{ 
          width: 14, 
          height: 14,
          marginTop: 100, 
          tintColor: '#FFFFFF',
        }} 
        resizeMode="contain"
      />
      <Text style={{
        fontFamily: 'DMMono',
        fontSize: 13,
        fontWeight: '400',
        color: '#FFFFFF',
        paddingTop: 8,
        width: '50%'
      }}>
        {title}
      </Text>
    </View>
  );
};


export const TabNavigationStack = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { 
          backgroundColor: '#162C1B',
          height: 60 + insets.top,
        },
        headerTitleAlign: 'left',
        headerTitle: () => (
          <View style={{ 
            flexDirection: 'row', 
            paddingLeft: 10,
            marginTop: insets.top,
          }}>
            <Image 
              source={RickLogo} 
              style={{ 
                width: 105, 
                height: 32,
                marginBottom: 60,
                resizeMode: 'contain' 
              }} 
            />
          </View>
        ),
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: 80,
          width: '50%',
        },
        tabBarInactiveBackgroundColor: '#162C1B',
        tabBarActiveBackgroundColor: '#224229',
        tabBarStyle: {
          height: 50 + insets.bottom,
          backgroundColor: '#162C1B',
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Characters"
        component={CharacterListScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <TabsIcon 
              icon={CharacterIcon} 
              title="ALL CHARACTERS" 
              isFocused={focused} 
            />
          ),
        })}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteCharactersScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <TabsIcon
              icon={FavoriteIcon} 
              title="LIKED CHARACTERS" 
              isFocused={focused} 
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
