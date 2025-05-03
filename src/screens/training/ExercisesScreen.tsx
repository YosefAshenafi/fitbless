import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, MARGIN_HORIZONTAL } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const mockExercises = [
  {
    id: '1',
    name: 'Barbell Squat',
    category: 'Legs',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    lastPerformed: '2 days ago',
  },
  {
    id: '2',
    name: 'Bench Press',
    category: 'Chest',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    lastPerformed: 'Yesterday',
  },
  {
    id: '3',
    name: 'Pull-ups',
    category: 'Back',
    equipment: 'Bodyweight',
    difficulty: 'Advanced',
    lastPerformed: '3 days ago',
  },
];

export const ExercisesScreen = () => {
  const renderExercise = ({ item }: { item: typeof mockExercises[0] }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="barbell-outline" size={16} color={COLORS.text.secondary} />
          <Text style={styles.detailText}>{item.equipment}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="body-outline" size={16} color={COLORS.text.secondary} />
          <Text style={styles.detailText}>{item.category}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color={COLORS.text.secondary} />
          <Text style={styles.detailText}>Last: {item.lastPerformed}</Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
          <Ionicons name="play" size={20} color={COLORS.text.light} />
          <Text style={styles.actionBtnText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.editBtn]} activeOpacity={0.7}>
          <Ionicons name="create-outline" size={20} color={COLORS.primary} />
          <Text style={[styles.actionBtnText, styles.editBtnText]}>Edit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionBtn} activeOpacity={0.7}>
            <Ionicons name="add-circle-outline" size={24} color={COLORS.text.light} />
            <Text style={styles.quickActionText}>Add Exercise</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionBtn} activeOpacity={0.7}>
            <Ionicons name="search-outline" size={24} color={COLORS.text.light} />
            <Text style={styles.quickActionText}>Search</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockExercises}
          renderItem={renderExercise}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: MARGIN_HORIZONTAL,
  },
  scrollView: {
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: MARGIN_HORIZONTAL,
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  quickActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    marginHorizontal: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginLeft: SPACING.sm,
  },
  listContent: {
    paddingHorizontal: MARGIN_HORIZONTAL,
    paddingBottom: SPACING.xl * 2,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: 'transparent',
    elevation: 0,
    padding: SPACING.md,
  },
  cardHeader: {
    marginBottom: SPACING.md,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
  },
  difficultyBadge: {
    backgroundColor: COLORS.primary + '10',
    borderRadius: 12,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  difficultyText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  detailText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginLeft: 4,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.sm,
    marginHorizontal: SPACING.xs,
  },
  actionBtnText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginLeft: SPACING.xs,
  },
  editBtn: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  editBtnText: {
    color: COLORS.primary,
  },
  header: {
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  content: {
    paddingHorizontal: MARGIN_HORIZONTAL,
  },
  section: {
    marginHorizontal: MARGIN_HORIZONTAL,
  },
}); 