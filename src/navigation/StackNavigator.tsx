import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { TabNavigator } from './TabNavigator';
import NewWorkoutScreen from '../screens/workout/NewWorkoutScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="NewWorkout" component={NewWorkoutScreen} />
      {/* Add other stack screens here as we implement them */}
    </Stack.Navigator>
  );
}; 