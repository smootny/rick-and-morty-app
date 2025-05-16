import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CharacterDetailsScreen } from './screens/CharacterDetails';
import { CharacterDetailsStackParamList } from './CharacterDetails.routes';
import RickLogo from '../../../assets/Rick_and_Morty.png';
import { Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<CharacterDetailsStackParamList>();

export const CharacterDetailsStack = () => {
  const insets = useSafeAreaInsets();

  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: '#162C1B',
      },
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View style={{
          flexDirection: 'row',
          paddingRight: 220,
          paddingTop: insets.top,
          paddingBottom: 8,
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
      }}
    >
      <Stack.Screen
        name="CharacterDetailsScreen"
        component={CharacterDetailsScreen}
      />
    </Stack.Navigator>
  );
};
