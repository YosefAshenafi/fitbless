import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY, SPACING, MARGIN_HORIZONTAL } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={36} color={COLORS.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="create-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="key-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.text.secondary} style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="logo-google" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Connect Google</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.text.secondary} style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="logo-apple" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Connect Apple</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.text.secondary} style={styles.chevron} />
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="notifications-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: COLORS.surface, true: COLORS.primary }}
              thumbColor={notificationsEnabled ? COLORS.primary : COLORS.surface}
              style={styles.switch}
            />
          </View>
        </View>

        {/* App Section */}
        <Text style={styles.sectionTitle}>App</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="moon-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: COLORS.surface, true: COLORS.primary }}
              thumbColor={darkMode ? COLORS.primary : COLORS.surface}
              style={styles.switch}
            />
          </View>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>About</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.text.secondary} style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="code-working-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Version</Text>
            <Text style={styles.versionText}>1.0.0</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginTop: SPACING.xl,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
  },
  profileEmail: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginTop: 2,
  },
  editBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.secondary,
    marginLeft: MARGIN_HORIZONTAL,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: 'transparent',
    elevation: 0,
    paddingHorizontal: SPACING.md,
    paddingVertical: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
  },
  rowIcon: {
    marginRight: 16,
  },
  rowText: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  chevron: {
    marginLeft: 8,
  },
  switch: {
    marginLeft: 8,
  },
  section: {
    marginBottom: SPACING.lg,
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  content: {
    paddingHorizontal: MARGIN_HORIZONTAL,
  },
  versionText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginLeft: 8,
  },
}); 