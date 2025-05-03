import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoutinesScreen } from './training/RoutinesScreen';
import { ProgramsScreen } from './training/ProgramsScreen';
import { ExercisesScreen } from './training/ExercisesScreen';
import { COLORS, TYPOGRAPHY, SPACING, MARGIN_HORIZONTAL } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

export const TrainingScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Training</Text>
          <Text style={styles.subtitle}>Manage your workouts and exercises</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <Ionicons name="search-outline" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <Ionicons name="filter-outline" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.text.secondary,
          tabBarLabelStyle: {
            fontFamily: TYPOGRAPHY.fontFamily.medium,
            fontSize: TYPOGRAPHY.fontSize.md,
            textTransform: 'none',
          },
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.primary,
            height: 3,
            borderRadius: 2,
          },
          tabBarStyle: {
            backgroundColor: COLORS.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#F0F0F0',
          },
        }}
      >
        <Tab.Screen 
          name="Routines" 
          component={RoutinesScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="list-outline" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Programs" 
          component={ProgramsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="calendar-outline" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Exercises" 
          component={ExercisesScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="barbell-outline" size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => Alert.alert('New Workout', 'Start a new workout (feature coming soon!)')}
      >
        <Ionicons name="add" size={32} color={COLORS.text.light} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: MARGIN_HORIZONTAL,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  fab: {
    position: 'absolute',
    right: MARGIN_HORIZONTAL,
    bottom: 32,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 100,
  },
}); 