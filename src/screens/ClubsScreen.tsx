import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY, SPACING, MARGIN_HORIZONTAL } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const mockClubs = [
  {
    id: '1',
    name: 'Morning Runners',
    members: 24,
    role: 'Admin',
    activity: '5 new runs this week',
    image: '🏃‍♂️',
  },
  {
    id: '2',
    name: 'Strength Squad',
    members: 12,
    role: 'Member',
    activity: '2 new PRs set',
    image: '💪',
  },
];

export const ClubsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'join' | 'chat' | null>(null);
  const [selectedClub, setSelectedClub] = useState<typeof mockClubs[0] | null>(null);
  const [clubName, setClubName] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const openModal = (type: 'create' | 'join' | 'chat', club?: typeof mockClubs[0]) => {
    setModalType(type);
    setModalVisible(true);
    if (type === 'chat' && club) setSelectedClub(club);
    else setSelectedClub(null);
  };
  const closeModal = () => {
    setModalVisible(false);
    setModalType(null);
    setSelectedClub(null);
    setClubName('');
    setJoinCode('');
  };

  const renderClub = ({ item }: { item: typeof mockClubs[0] }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => openModal('chat', item)}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.clubImage}>
            <Text style={styles.clubImageText}>{item.image}</Text>
          </View>
          <View style={styles.clubInfo}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View style={styles.roleBadge}>
              <Ionicons name={item.role === 'Admin' ? 'star' : 'person'} size={14} color={COLORS.primary} />
              <Text style={styles.roleText}>{item.role}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="people-outline" size={16} color={COLORS.text.secondary} />
            <Text style={styles.detailText}>{item.members} members</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="pulse-outline" size={16} color={COLORS.text.secondary} />
            <Text style={styles.detailText}>{item.activity}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardAction}>
        <Ionicons name="chevron-forward" size={20} color={COLORS.text.secondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Clubs</Text>
          <Text style={styles.subtitle}>Join, create, and manage your fitness clubs</Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.actionBtn} 
            onPress={() => openModal('create')}
            activeOpacity={0.7}
          >
            <Ionicons name="add-circle-outline" size={22} color={COLORS.text.light} />
            <Text style={styles.actionBtnText}>Create Club</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionBtn, styles.joinBtn]} 
            onPress={() => openModal('join')}
            activeOpacity={0.7}
          >
            <Ionicons name="log-in-outline" size={22} color={COLORS.primary} />
            <Text style={[styles.actionBtnText, styles.joinBtnText]}>Join Club</Text>
          </TouchableOpacity>
        </View>

        {mockClubs.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color={COLORS.primary} style={{ marginBottom: SPACING.md }} />
            <Text style={styles.emptyTitle}>No Clubs Yet</Text>
            <Text style={styles.emptyText}>Create or join a club to get started!</Text>
          </View>
        ) : (
          <FlatList
            data={mockClubs}
            renderItem={renderClub}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modalType === 'create' ? 'Create a Club' : 
                 modalType === 'join' ? 'Join a Club' : 
                 selectedClub?.name + ' Chat'}
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.modalCloseBtn}>
                <Ionicons name="close" size={24} color={COLORS.text.secondary} />
              </TouchableOpacity>
            </View>

            {modalType === 'create' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Club Name"
                  placeholderTextColor={COLORS.text.secondary}
                  value={clubName}
                  onChangeText={setClubName}
                />
                <TouchableOpacity style={styles.modalActionBtn} onPress={closeModal}>
                  <Ionicons name="checkmark" size={22} color={COLORS.text.light} />
                  <Text style={styles.modalActionText}>Create Club</Text>
                </TouchableOpacity>
              </>
            )}

            {modalType === 'join' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Invite Code"
                  placeholderTextColor={COLORS.text.secondary}
                  value={joinCode}
                  onChangeText={setJoinCode}
                />
                <TouchableOpacity style={styles.modalActionBtn} onPress={closeModal}>
                  <Ionicons name="log-in" size={22} color={COLORS.text.light} />
                  <Text style={styles.modalActionText}>Join Club</Text>
                </TouchableOpacity>
              </>
            )}

            {modalType === 'chat' && selectedClub && (
              <>
                <View style={styles.chatPlaceholder}>
                  <Ionicons name="chatbubble-ellipses-outline" size={48} color={COLORS.primary} />
                  <Text style={styles.chatPlaceholderText}>Club chat coming soon!</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: MARGIN_HORIZONTAL,
  },
  header: {
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
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  actionBtn: {
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
  },
  actionBtnText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginLeft: SPACING.sm,
  },
  joinBtn: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  joinBtnText: {
    color: COLORS.primary,
  },
  listContent: {
    paddingBottom: SPACING.xl * 2,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: 'transparent',
    elevation: 0,
  },
  cardContent: {
    flex: 1,
    padding: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  clubImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  clubImageText: {
    fontSize: 24,
  },
  clubInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
    borderRadius: 12,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  roleText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginLeft: 4,
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
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginLeft: 4,
  },
  cardAction: {
    padding: SPACING.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: SPACING.xl,
    paddingBottom: SPACING.xl * 2,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
  },
  modalCloseBtn: {
    padding: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: COLORS.text.primary,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  modalActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  modalActionText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginLeft: SPACING.sm,
  },
  chatPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  chatPlaceholderText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginTop: SPACING.md,
  },
}); 