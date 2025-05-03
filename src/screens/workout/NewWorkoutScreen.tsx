import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, MARGIN_HORIZONTAL } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useFocusEffect } from '@react-navigation/native';

const EXERCISE_LIBRARY = [
  { id: '1', name: 'Barbell Squat' },
  { id: '2', name: 'Bench Press' },
  { id: '3', name: 'Pull-ups' },
  { id: '4', name: 'Deadlift' },
  { id: '5', name: 'Overhead Press' },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function uuid() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

export default function NewWorkoutScreen({ navigation }: any) {
  const route = useRoute();
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [exercises, setExercises] = useState<any[]>([]);
  const [addingExercise, setAddingExercise] = useState(false);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning]);

  useFocusEffect(
    React.useCallback(() => {
      if ((route as any).params && (route as any).params.start) {
        setTimer(0);
        setIsRunning(true);
        navigation.setParams && navigation.setParams({ start: undefined });
      }
      if ((route as any).params && (route as any).params.exercises && Array.isArray((route as any).params.exercises)) {
        const exs = (route as any).params.exercises;
        if (exs.length) {
          setExercises(exs.map((ex: any) => ({ ...ex, sets: [] })));
          navigation.setParams && navigation.setParams({ exercises: undefined });
        }
      }
    }, [route, navigation])
  );

  const handleAddExercise = (exercise: any) => {
    setExercises([...exercises, { ...exercise, sets: [] }]);
    setAddingExercise(false);
  };

  const handleAddSet = (exerciseIdx: number) => {
    const updated = [...exercises];
    updated[exerciseIdx].sets.push({ id: uuid(), reps: '', weight: '', rest: '' });
    setExercises(updated);
  };

  const handleSetChange = (exerciseIdx: number, setId: string, field: string, value: string) => {
    const updated = [...exercises];
    const setIdx = updated[exerciseIdx].sets.findIndex((s: any) => s.id === setId);
    if (setIdx !== -1) {
      updated[exerciseIdx].sets[setIdx][field] = value;
      setExercises(updated);
    }
  };

  const handleRemoveExercise = (idx: number) => {
    const updated = [...exercises];
    updated.splice(idx, 1);
    setExercises(updated);
  };

  const handleSave = () => {
    Alert.alert('Workout Saved', 'Your workout has been saved!');
    navigation.goBack();
  };

  const handleCancel = () => {
    Alert.alert('Cancel Workout', 'Are you sure you want to cancel?', [
      { text: 'No' },
      { text: 'Yes', style: 'destructive', onPress: () => navigation.goBack() },
    ]);
  };

  const renderSet = (exerciseIdx: number) => ({ item }: { item: any }) => (
    <View key={item.id} style={styles.setRow}>
      <Text style={styles.setNum}>Set</Text>
      <TextInput
        style={styles.input}
        placeholder="Reps"
        keyboardType="numeric"
        value={item.reps}
        onChangeText={v => handleSetChange(exerciseIdx, item.id, 'reps', v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        keyboardType="numeric"
        value={item.weight}
        onChangeText={v => handleSetChange(exerciseIdx, item.id, 'weight', v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Rest (s)"
        keyboardType="numeric"
        value={item.rest}
        onChangeText={v => handleSetChange(exerciseIdx, item.id, 'rest', v)}
      />
    </View>
  );

  const renderExercise = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleRemoveExercise(index)}>
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={item.sets}
        renderItem={renderSet(index)}
        keyExtractor={set => set.id}
        scrollEnabled={false}
      />
      <TouchableOpacity style={styles.addSetBtn} onPress={() => handleAddSet(index)}>
        <Ionicons name="add" size={18} color={COLORS.primary} />
        <Text style={styles.addSetText}>Add Set</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={[COLORS.background, COLORS.surface]}
        style={styles.gradientBg}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={64}
        >
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Ionicons name="barbell-outline" size={28} color={COLORS.primary} style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.title}>Workout Session</Text>
                <Text style={styles.subtitle}>Log your sets and progress</Text>
              </View>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={handleCancel} style={styles.headerBtn}>
                <Ionicons name="close" size={28} color={COLORS.text.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.headerBtn}>
                <Ionicons name="checkmark" size={28} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Timer Card */}
          <View style={styles.timerCard}>
            <Ionicons name="time-outline" size={22} color={COLORS.primary} style={{ marginRight: 8 }} />
            <Text style={styles.timer}>{formatTime(timer)}</Text>
            <TouchableOpacity onPress={() => setIsRunning(r => !r)} style={styles.timerBtn}>
              <Ionicons name={isRunning ? 'pause' : 'play'} size={22} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Exercises List */}
          <FlatList
            data={exercises}
            renderItem={renderExercise}
            keyExtractor={item => item.id}
            ListFooterComponent={
              <>
                <TouchableOpacity style={styles.addExerciseBtn} onPress={() => setAddingExercise(true)}>
                  <Ionicons name="add-circle-outline" size={24} color={COLORS.text.light} />
                  <Text style={styles.addExerciseText}>Add Exercise</Text>
                </TouchableOpacity>
                <Modal
                  visible={addingExercise}
                  animationType="slide"
                  transparent
                  onRequestClose={() => setAddingExercise(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.exercisePickerModal}>
                      <Text style={styles.pickerTitle}>Select Exercise</Text>
                      {EXERCISE_LIBRARY.map(ex => (
                        <TouchableOpacity
                          key={ex.id}
                          style={styles.pickerItem}
                          onPress={() => handleAddExercise(ex)}
                        >
                          <Text style={styles.pickerItemText}>{ex.name}</Text>
                        </TouchableOpacity>
                      ))}
                      <TouchableOpacity onPress={() => setAddingExercise(false)} style={styles.pickerCancel}>
                        <Text style={styles.pickerCancelText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </>
            }
            contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }}
          />
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  gradientBg: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: MARGIN_HORIZONTAL,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerBtn: {
    padding: 4,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  timerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  timer: {
    fontSize: 36,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.primary,
    marginRight: SPACING.md,
  },
  timerBtn: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  exerciseCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.md,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  exerciseName: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.text.primary,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  setNum: {
    width: 48,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  input: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.primary,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addSetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
    alignSelf: 'flex-start',
  },
  addSetText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginLeft: 4,
  },
  addExerciseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  addExerciseText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  exercisePickerModal: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 100,
    width: 320,
    maxWidth: '90%',
  },
  pickerTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  pickerItem: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  pickerItemText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
  },
  pickerCancel: {
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  pickerCancelText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: MARGIN_HORIZONTAL,
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