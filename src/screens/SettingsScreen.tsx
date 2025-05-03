import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY, SPACING, MARGIN_HORIZONTAL } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const mockRoutines = [
  { id: '1', name: 'Push Pull Legs', days: 6 },
  { id: '2', name: 'Full Body Beginner', days: 3 },
];
const mockPrograms = [
  { id: '1', name: 'Summer Shred', weeks: 8 },
];
const mockExercises = [
  { id: '1', name: 'Bench Press', muscle: 'Chest' },
  { id: '2', name: 'Squat', muscle: 'Legs' },
];

export const SettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.topRow}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.settingsBtn} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Workout Hub</Text>
        <Text style={styles.subtitle}>
          Create and manage your routines, programs, and exercises.
        </Text>
        <TouchableOpacity style={styles.createBtn} onPress={() => {}}>
          <Ionicons name="add-circle-outline" size={28} color={COLORS.text.light} />
          <Text style={styles.createBtnText}>Create New Routine</Text>
        </TouchableOpacity>

        {/* Workout Routines Section */}
        <Text style={styles.sectionTitle}>Your Routines</Text>
        <View style={styles.listCard}>
          {mockRoutines.map(item => (
            <View style={styles.listRow} key={item.id}>
              <View style={styles.listInfo}>
                <Text style={styles.listTitle}>{item.name}</Text>
                <Text style={styles.listSubtitle}>{item.days} days/week</Text>
              </View>
              <TouchableOpacity style={styles.listAction} onPress={() => {}}>
                <Ionicons name="create-outline" size={18} color={COLORS.primary} />
                <Text style={styles.listActionText}>Edit</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Programmed Workouts Section */}
        <Text style={styles.sectionTitle}>Programmed Workouts</Text>
        <View style={styles.listCard}>
          {mockPrograms.map(item => (
            <View style={styles.listRow} key={item.id}>
              <View style={styles.listInfo}>
                <Text style={styles.listTitle}>{item.name}</Text>
                <Text style={styles.listSubtitle}>{item.weeks} weeks</Text>
              </View>
              <TouchableOpacity style={styles.listAction} onPress={() => {}}>
                <Ionicons name="create-outline" size={18} color={COLORS.primary} />
                <Text style={styles.listActionText}>Edit</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Exercises Section */}
        <Text style={styles.sectionTitle}>Exercises</Text>
        <View style={styles.listCard}>
          {mockExercises.map(item => (
            <View style={styles.listRow} key={item.id}>
              <View style={styles.listInfo}>
                <Text style={styles.listTitle}>{item.name}</Text>
                <Text style={styles.listSubtitle}>{item.muscle}</Text>
              </View>
              <TouchableOpacity style={styles.listAction} onPress={() => {}}>
                <Ionicons name="create-outline" size={18} color={COLORS.primary} />
                <Text style={styles.listActionText}>Edit</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: MARGIN_HORIZONTAL,
    paddingTop: SPACING.md,
    marginBottom: 0,
  },
  settingsBtn: {
    padding: 6,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: MARGIN_HORIZONTAL,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl * 2,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.primary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    alignSelf: 'center',
    marginBottom: SPACING.xl,
  },
  createBtnText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginLeft: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
    marginTop: SPACING.lg,
    marginLeft: 2,
  },
  listCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: 'transparent',
    elevation: 0,
    paddingVertical: 2,
    paddingHorizontal: 0,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: MARGIN_HORIZONTAL,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
  },
  listInfo: {
    flex: 1,
  },
  listTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
  },
  listSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginTop: 2,
  },
  listAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  listActionText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginLeft: 6,
  },
}); 