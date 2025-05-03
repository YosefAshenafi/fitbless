import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Platform, Pressable, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY, SPACING, MARGIN_HORIZONTAL } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

// Define Workout type
interface Workout {
  id: string;
  title: string;
  date: string;
  duration: string;
  calories: number;
  type: string;
  note: string;
}

const mockHistory: Workout[] = [
  {
    id: '1',
    title: 'Upper Body Strength',
    date: '2024-06-01',
    duration: '45',
    calories: 320,
    type: 'strength',
    note: 'Felt strong, increased bench press weight!',
  },
  {
    id: '2',
    title: 'Cardio Blast',
    date: '2024-05-30',
    duration: '30',
    calories: 210,
    type: 'cardio',
    note: 'Great run, new personal best!',
  },
  {
    id: '3',
    title: 'Leg Day',
    date: '2024-05-28',
    duration: '50',
    calories: 400,
    type: 'strength',
    note: 'Squats felt easier today.',
  },
];

type GroupedSection = { title: string; data: Workout[] };

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function groupByDate(history: Workout[]): GroupedSection[] {
  if (!history.length) return [];
  const today = new Date().toISOString().slice(0, 10);
  const groups: GroupedSection[] = [];
  const todayItems = history.filter(item => item.date === today);
  if (todayItems.length) groups.push({ title: 'Today', data: todayItems });
  const rest = history.filter(item => item.date !== today);
  if (rest.length) groups.push({ title: 'Earlier', data: rest });
  return groups;
}

function getStats(history: Workout[]) {
  return {
    count: history.length,
    duration: history.reduce((acc: number, cur: Workout) => acc + parseInt(cur.duration), 0),
    calories: history.reduce((acc: number, cur: Workout) => acc + cur.calories, 0),
  };
}

export const HistoryScreen = () => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const filteredHistory = mockHistory.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  const grouped = groupByDate(filteredHistory);
  const stats = getStats(filteredHistory);

  const renderHistory = ({ item }: { item: Workout }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => { setSelectedWorkout(item); setModalVisible(true); }}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.cardDateRow}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.text.secondary} style={{ marginRight: 4 }} />
            <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
          </View>
        </View>
        <View style={styles.cardDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={18} color={COLORS.primary} />
            <Text style={styles.detailText}>{item.duration} min</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="flame-outline" size={18} color={COLORS.error} />
            <Text style={styles.detailText}>{item.calories} kcal</Text>
          </View>
        </View>
        <Text style={styles.noteText} numberOfLines={1}>{item.note}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout History</Text>
        <Text style={styles.subtitle}>Review your past workouts and progress</Text>
      </View>
      <View style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Ionicons name="barbell-outline" size={20} color={COLORS.primary} />
            <Text style={styles.statValue}>{stats.count}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="time-outline" size={20} color={COLORS.primary} />
            <Text style={styles.statValue}>{stats.duration} min</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="flame-outline" size={20} color={COLORS.error} />
            <Text style={styles.statValue}>{stats.calories}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn} onPress={() => {}}>
            <Ionicons name="filter" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.text.secondary} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search workouts..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={COLORS.text.secondary}
        />
      </View>
      {grouped.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="barbell-outline" size={64} color={COLORS.primary} style={{ marginBottom: SPACING.md }} />
          <Text style={styles.emptyTitle}>No Workouts Found</Text>
          <Text style={styles.emptyText}>Try a different search or complete a workout!</Text>
        </View>
      ) : (
        <FlatList
          data={grouped}
          keyExtractor={(section) => section.title}
          renderItem={({ item: section }: { item: GroupedSection }) => (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.data.map((item) => (
                <React.Fragment key={item.id}>{renderHistory({ item })}</React.Fragment>
              ))}
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedWorkout && (
              <>
                <Text style={styles.modalTitle}>{selectedWorkout.title}</Text>
                <Text style={styles.modalDate}>{formatDate(selectedWorkout.date)}</Text>
                <Text style={styles.modalNote}>{selectedWorkout.note}</Text>
                <View style={styles.modalStatsRow}>
                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={18} color={COLORS.primary} />
                    <Text style={styles.detailText}>{selectedWorkout.duration} min</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="flame-outline" size={18} color={COLORS.error} />
                    <Text style={styles.detailText}>{selectedWorkout.calories} kcal</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={28} color={COLORS.primary} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: MARGIN_HORIZONTAL,
  },
  header: {
    paddingTop: SPACING.xl,
    paddingHorizontal: MARGIN_HORIZONTAL,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    opacity: 0.9,
  },
  statsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: 'transparent',
    elevation: 0,
    padding: SPACING.md,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 70,
    marginRight: 8,
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.primary,
    marginTop: 2,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  filterBtn: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 8,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.surface,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.surface,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    backgroundColor: 'transparent',
    padding: 0,
  },
  listContent: {
    paddingHorizontal: MARGIN_HORIZONTAL,
    paddingBottom: 100,
  },
  section: {
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.secondary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
    marginLeft: 2,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginBottom: SPACING.lg,
    marginHorizontal: MARGIN_HORIZONTAL,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: 'transparent',
    elevation: 0,
    padding: SPACING.md,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  cardContent: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
    paddingLeft: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
    flex: 1,
    flexWrap: 'wrap',
  },
  cardDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACING.md,
  },
  cardDate: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  detailText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginLeft: 4,
  },
  noteText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginTop: 4,
    opacity: 0.8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: 18,
    padding: SPACING.xl,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  modalDate: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginBottom: SPACING.md,
  },
  modalNote: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  modalStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 4,
  },
}); 