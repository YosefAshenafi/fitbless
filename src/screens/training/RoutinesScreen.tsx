import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, MARGIN_HORIZONTAL } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const mockRoutines = [
  {
    id: '1',
    name: 'Push Pull Legs',
    days: 6,
    duration: '60 min',
    difficulty: 'Intermediate',
    lastCompleted: '2 days ago',
    exercises: 24,
  },
  {
    id: '2',
    name: 'Full Body Beginner',
    days: 3,
    duration: '45 min',
    difficulty: 'Beginner',
    lastCompleted: '1 week ago',
    exercises: 12,
  },
  {
    id: '3',
    name: 'Upper Body Focus',
    days: 4,
    duration: '50 min',
    difficulty: 'Advanced',
    lastCompleted: 'Never',
    exercises: 18,
  },
];

export const RoutinesScreen = () => {
  const renderRoutine = ({ item }: { item: typeof mockRoutines[0] }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
        </View>
        <View style={styles.cardStats}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={16} color={COLORS.text.secondary} />
            <Text style={styles.statText}>{item.duration}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.text.secondary} />
            <Text style={styles.statText}>{item.days} days/week</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="barbell-outline" size={16} color={COLORS.text.secondary} />
          <Text style={styles.detailText}>{item.exercises} exercises</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="checkmark-circle-outline" size={16} color={COLORS.text.secondary} />
          <Text style={styles.detailText}>Last: {item.lastCompleted}</Text>
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
            <Text style={styles.quickActionText}>Create Routine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionBtn} activeOpacity={0.7}>
            <Ionicons name="download-outline" size={24} color={COLORS.text.light} />
            <Text style={styles.quickActionText}>Import</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockRoutines}
          renderItem={renderRoutine}
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
  cardStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  statText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginLeft: 4,
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
}); 