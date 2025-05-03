import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, MARGIN_HORIZONTAL } from '../constants/theme';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import profileYosef from '../assets/profile/yosef.jpg';

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Home'>;

const user = {
  name: 'Yosef',
  avatar: profileYosef,
};

const quickStats = [
  { icon: 'flame', label: 'Calories', value: 320 },
  { icon: 'time', label: 'Minutes', value: 42 },
  { icon: 'barbell-outline', label: 'Streak', value: 5 },
];

const recentActivities = [
  {
    id: '1',
    type: 'workout',
    title: 'Push Pull Legs',
    subtitle: 'Completed 60 min workout',
    time: '2h ago',
    icon: 'barbell-outline',
  },
  {
    id: '2',
    type: 'club',
    title: 'Strength Squad',
    subtitle: 'You joined a new club',
    time: '5h ago',
    icon: 'people-outline',
  },
  {
    id: '3',
    type: 'goal',
    title: 'Daily Goal',
    subtitle: 'You hit your daily goal!',
    time: 'Today',
    icon: 'checkmark-circle-outline',
  },
];

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

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Mock daily goal progress
  const dailyGoal = 60; // minutes
  const dailyProgress = 42; // minutes completed
  const progressPercent = Math.min(1, dailyProgress / dailyGoal);

  // Mock upcoming workout
  const upcomingWorkout = {
    name: 'Upper Body Strength',
    time: 'Today, 6:00 PM',
    icon: 'barbell-outline',
  };

  // Mock streak
  const streak = 5;

  // Mock tip
  const tip = 'Stay hydrated! Drink water before, during, and after your workout.';

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.appName}>FitBless</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={24} color={COLORS.primary} />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recentActivities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.activityCard}>
            <View style={styles.activityIconWrapper}>
              <Ionicons name={item.icon as React.ComponentProps<typeof Ionicons>["name"]} size={22} color={COLORS.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>{item.title}</Text>
              <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.activityTime}>{item.time}</Text>
          </View>
        )}
        ListHeaderComponent={
          <>
            {/* Gradient Banner */}
            <LinearGradient
              colors={[COLORS.primary, COLORS.accent || '#8BC34A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.banner}
            >
              <View style={styles.bannerContent}>
                <Image source={user.avatar} style={styles.avatar} />
                <View>
                  <Text style={styles.bannerGreeting}>Welcome back,</Text>
                  <Text style={styles.bannerName}>{user.name}</Text>
                  <Text style={styles.bannerMotivation}>
                    "Every rep counts. Let's crush it today!"
                  </Text>
                </View>
              </View>
            </LinearGradient>

            {/* Daily Goal Progress */}
            <View style={styles.goalRow}>
              <View style={styles.progressRingWrapper}>
                <View style={styles.progressRingBg}>
                  <View
                    style={[
                      styles.progressRingFg,
                      { transform: [{ rotate: `${progressPercent * 360}deg` }], borderColor: COLORS.primary },
                    ]}
                  />
                  <Text style={styles.progressRingText}>{Math.round(progressPercent * 100)}%</Text>
                </View>
                <Text style={styles.goalLabel}>Daily Goal</Text>
              </View>
              <View style={styles.goalInfo}>
                <Text style={styles.goalValue}>{dailyProgress} / {dailyGoal} min</Text>
                <Text style={styles.goalSubLabel}>Completed</Text>
              </View>
              <View style={styles.streakWrapper}>
                <Ionicons name="flame" size={22} color={COLORS.primary} />
                <Text style={styles.streakText}>{streak} day streak</Text>
              </View>
            </View>

            {/* Upcoming Workout */}
            <View style={styles.upcomingCard}>
              <Ionicons name={upcomingWorkout.icon as React.ComponentProps<typeof Ionicons>["name"]} size={28} color={COLORS.primary} style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.upcomingTitle}>{upcomingWorkout.name}</Text>
                <Text style={styles.upcomingTime}>{upcomingWorkout.time}</Text>
              </View>
              <TouchableOpacity style={styles.upcomingStartBtn}>
                <Ionicons name="play" size={18} color={COLORS.text.light} />
                <Text style={styles.upcomingStartText}>Start</Text>
              </TouchableOpacity>
            </View>

            {/* Weekly Activity Summary */}
            <View style={styles.weeklySummaryCard}>
              <Text style={styles.weeklySummaryTitle}>Weekly Activity</Text>
              <View style={styles.weeklyBarRow}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                  const activity = [30, 45, 60, 20, 50, 0, 40][i]; // mock minutes
                  return (
                    <View key={day + i} style={styles.weeklyBarItem}>
                      <View style={[styles.weeklyBar, { height: activity, backgroundColor: activity > 0 ? COLORS.primary : '#E0E0E0' }]} />
                      <Text style={styles.weeklyBarLabel}>{day}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Personal Bests */}
            <View style={styles.personalBestsCard}>
              <Text style={styles.personalBestsTitle}>Personal Bests</Text>
              <View style={styles.personalBestsRow}>
                <View style={styles.bestItem}>
                  <Ionicons name="barbell-outline" size={22} color={COLORS.primary} />
                  <Text style={styles.bestValue}>120kg</Text>
                  <Text style={styles.bestLabel}>Squat</Text>
                </View>
                <View style={styles.bestItem}>
                  <Ionicons name="walk-outline" size={22} color={COLORS.primary} />
                  <Text style={styles.bestValue}>10km</Text>
                  <Text style={styles.bestLabel}>Run</Text>
                </View>
                <View style={styles.bestItem}>
                  <Ionicons name="flame-outline" size={22} color={COLORS.primary} />
                  <Text style={styles.bestValue}>800</Text>
                  <Text style={styles.bestLabel}>Calories</Text>
                </View>
              </View>
            </View>

            {/* Upcoming Club Event */}
            <View style={styles.clubEventCard}>
              <Ionicons name="people-outline" size={22} color={COLORS.primary} style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.clubEventTitle}>Next Club Event</Text>
                <Text style={styles.clubEventDetail}>5K Run Challenge - Sat, 9:00 AM</Text>
              </View>
              <TouchableOpacity style={styles.clubEventJoinBtn}>
                <Text style={styles.clubEventJoinText}>Join</Text>
              </TouchableOpacity>
            </View>

            {/* Friends Leaderboard */}
            <View style={styles.leaderboardCard}>
              <Text style={styles.leaderboardTitle}>Friends Leaderboard</Text>
              <View style={styles.leaderboardRow}>
                <View style={styles.leaderboardItem}>
                  <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.leaderboardAvatar} />
                  <Text style={styles.leaderboardName}>Alex</Text>
                  <Text style={styles.leaderboardScore}>5</Text>
                </View>
                <View style={styles.leaderboardItem}>
                  <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} style={styles.leaderboardAvatar} />
                  <Text style={styles.leaderboardName}>Sam</Text>
                  <Text style={styles.leaderboardScore}>4</Text>
                </View>
                <View style={styles.leaderboardItem}>
                  <Image source={{ uri: 'https://randomuser.me/api/portraits/men/65.jpg' }} style={styles.leaderboardAvatar} />
                  <Text style={styles.leaderboardName}>Chris</Text>
                  <Text style={styles.leaderboardScore}>3</Text>
                </View>
              </View>
            </View>

            {/* Motivational Quote */}
            <View style={styles.quoteCard}>
              <Ionicons name="chatbubble-ellipses-outline" size={22} color={COLORS.primary} style={{ marginRight: 8 }} />
              <Text style={styles.quoteText}>
                "Success isn't always about greatness. It's about consistency. Consistent hard work leads to success. Greatness will come."
              </Text>
            </View>

            {/* Recent Activity Feed Header */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeader}>Recent Activity</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        contentContainerStyle={styles.activityList}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: MARGIN_HORIZONTAL,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  appName: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.primary,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    height: 140,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginTop: SPACING.md,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: SPACING.md,
    justifyContent: 'flex-end',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: SPACING.lg,
    borderWidth: 2,
    borderColor: '#fff',
  },
  bannerGreeting: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginBottom: 2,
  },
  bannerName: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginBottom: 2,
  },
  bannerMotivation: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginTop: 2,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.md,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIconWrapper: {
    backgroundColor: COLORS.primary + '15',
    borderRadius: 16,
    padding: 8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  startWorkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  startWorkoutText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginLeft: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: MARGIN_HORIZONTAL,
    marginBottom: SPACING.sm,
  },
  sectionHeader: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
  },
  seeAll: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  activityList: {
    paddingHorizontal: MARGIN_HORIZONTAL,
    paddingBottom: SPACING.xl * 2,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  activityIconWrapper: {
    backgroundColor: COLORS.primary + '10',
    borderRadius: 16,
    padding: 8,
    marginRight: SPACING.md,
  },
  activityTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.text.primary,
  },
  activitySubtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  activityTime: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginLeft: 8,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: MARGIN_HORIZONTAL,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  progressRingWrapper: {
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  progressRingBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 4,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  progressRingFg: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 4,
    borderColor: COLORS.primary,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    top: 0,
    left: 0,
    transform: [{ rotate: '0deg' }],
  },
  progressRingText: {
    position: 'absolute',
    alignSelf: 'center',
    top: 16,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.primary,
  },
  goalLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  goalInfo: {
    flex: 1,
    alignItems: 'center',
  },
  goalValue: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.primary,
  },
  goalSubLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  streakWrapper: {
    alignItems: 'center',
    marginLeft: SPACING.lg,
  },
  streakText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginTop: 2,
  },
  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  upcomingTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
  },
  upcomingTime: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  upcomingStartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginLeft: 8,
  },
  upcomingStartText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginLeft: 4,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginTop: SPACING.lg,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  tipText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    flex: 1,
  },
  weeklySummaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  weeklySummaryTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  weeklyBarRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  weeklyBarItem: {
    alignItems: 'center',
    flex: 1,
  },
  weeklyBar: {
    width: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  weeklyBarLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  personalBestsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  personalBestsTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  personalBestsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  bestItem: {
    alignItems: 'center',
    flex: 1,
  },
  bestValue: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.primary,
    marginTop: 2,
  },
  bestLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  clubEventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  clubEventTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
  },
  clubEventDetail: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  clubEventJoinBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginLeft: 8,
  },
  clubEventJoinText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  leaderboardCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  leaderboardTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  leaderboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  leaderboardItem: {
    alignItems: 'center',
    flex: 1,
  },
  leaderboardAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: 4,
  },
  leaderboardName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.primary,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  leaderboardScore: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginTop: 2,
  },
  quoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginTop: SPACING.md,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  quoteText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    flex: 1,
  },
}); 