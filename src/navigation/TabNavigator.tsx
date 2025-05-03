import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import NewWorkoutScreen from '../screens/workout/NewWorkoutScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { ClubsScreen } from '../screens/ClubsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, TouchableOpacity, StyleSheet, Platform, Alert, Modal, Text, FlatList, Image } from 'react-native';
import { useState } from 'react';

const Tab = createBottomTabNavigator<RootTabParamList>();

const EXERCISE_LIBRARY = [
  { id: '1', name: 'Barbell Squat' },
  { id: '2', name: 'Bench Press' },
  { id: '3', name: 'Pull-ups' },
  { id: '4', name: 'Deadlift' },
  { id: '5', name: 'Overhead Press' },
];

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  return (
    <>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          let iconName = '';
          let iconColor = isFocused ? '#000000' : 'gray';
          let iconSize = 28;
          let isCenter = false;

          if (route.name === 'Home') {
            iconName = isFocused ? 'home' : 'home-outline';
          } else if (route.name === 'History') {
            iconName = isFocused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Training') {
            iconColor = '#000000';
            iconSize = 38;
            isCenter = true;
          } else if (route.name === 'Profile') {
            iconName = isFocused ? 'person' : 'person-outline';
          } else if (route.name === 'Clubs') {
            iconName = isFocused ? 'people' : 'people-outline';
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              if (route.name === 'Training') {
                setShowModal(true);
              } else {
                navigation.navigate(route.name);
              }
            }
          };

          if (isCenter) {
            return (
              <View key={route.key} style={styles.centerButtonWrapper}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  onPress={onPress}
                  activeOpacity={0.85}
                >
                  <View style={styles.centerButton}>
                    <Image 
                      source={require('../../assets/workout.png')} 
                      style={{ width: 38, height: 38 }} 
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <Ionicons name={iconName} size={iconSize} color={iconColor} />
            </TouchableOpacity>
          );
        })}
      </View>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Begin Workout</Text>
            <Text style={styles.modalSubtitle}>Select at least one exercise to begin:</Text>
            <FlatList
              data={EXERCISE_LIBRARY}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                const selected = selectedExercises.includes(item.id);
                return (
                  <TouchableOpacity
                    style={[styles.exerciseItem, selected && styles.exerciseItemSelected]}
                    onPress={() => {
                      setSelectedExercises(prev =>
                        prev.includes(item.id)
                          ? prev.filter(id => id !== item.id)
                          : [...prev, item.id]
                      );
                    }}
                  >
                    <Text style={[styles.exerciseName, selected && styles.exerciseNameSelected]}>{item.name}</Text>
                    {selected && <Ionicons name="checkmark-circle" size={22} color={styles.centerButton.backgroundColor} style={{ marginLeft: 8 }} />}
                  </TouchableOpacity>
                );
              }}
              style={{ maxHeight: 220, marginVertical: 12 }}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => { setShowModal(false); setSelectedExercises([]); }}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalConfirmBtn, { opacity: selectedExercises.length ? 1 : 0.5 }]}
                disabled={!selectedExercises.length}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('Training', { start: true, exercises: EXERCISE_LIBRARY.filter(ex => selectedExercises.includes(ex.id)) });
                  setSelectedExercises([]);
                }}
              >
                <Text style={styles.modalConfirmText}>Begin Workout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    paddingHorizontal: 18,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
  },
  centerButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: -28,
    zIndex: 10,
  },
  centerButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: 'gray',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    width: 340,
    maxWidth: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 6,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 15,
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: '#F7F7F7',
  },
  exerciseItemSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#000000',
    borderWidth: 1,
  },
  exerciseName: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  exerciseNameSelected: {
    color: '#000000',
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  modalCancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  modalCancelText: {
    color: '#888',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalConfirmBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#000000',
  },
  modalConfirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Training" component={NewWorkoutScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Clubs" component={ClubsScreen} />
    </Tab.Navigator>
  );
}; 