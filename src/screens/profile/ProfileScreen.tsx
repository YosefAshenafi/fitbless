import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY, SPACING, MARGIN_HORIZONTAL } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import profileYosef from '../../assets/profile/yosef.jpg';

export const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const handleWebsitePress = () => {
    Linking.openURL('https://yosefashenafi.github.io');
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={profileYosef} style={styles.profileImage} />
          <Text style={styles.profileName}>Yosef</Text>
          <Text style={styles.profileEmail}>yosef@example.com</Text>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Ionicons name="create-outline" size={20} color={COLORS.primary} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="key-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.text.secondary} style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Change Email</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.text.secondary} style={styles.chevron} />
          </TouchableOpacity>
        </View>

        {/* App Customization */}
        <Text style={styles.sectionTitle}>App Customization</Text>
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
          <View style={styles.row}>
            <Ionicons name="notifications-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: COLORS.surface, true: COLORS.primary }}
              thumbColor={notificationsEnabled ? COLORS.primary : COLORS.surface}
              style={styles.switch}
            />
          </View>
          <View style={styles.row}>
            <Ionicons name="volume-high-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Sound Effects</Text>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: COLORS.surface, true: COLORS.primary }}
              thumbColor={soundEnabled ? COLORS.primary : COLORS.surface}
              style={styles.switch}
            />
          </View>
          <View style={styles.row}>
            <Ionicons name="phone-portrait-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Vibration</Text>
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              trackColor={{ false: COLORS.surface, true: COLORS.primary }}
              thumbColor={vibrationEnabled ? COLORS.primary : COLORS.surface}
              style={styles.switch}
            />
          </View>
        </View>

        {/* About & Support */}
        <Text style={styles.sectionTitle}>About & Support</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>About FitBless</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.text.secondary} style={styles.chevron} />
          </TouchableOpacity>
          <View style={styles.row}>
            <Ionicons name="code-slash-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Developer</Text>
            <Text style={styles.developerText}>Yosef Ashenafi</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Contact</Text>
            <TouchableOpacity onPress={handleWebsitePress}>
              <Text style={[styles.developerText, styles.websiteLink]}>yosefashenafi.github.io</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="help-circle-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.text.secondary} style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="document-text-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.text.secondary} style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.text.secondary} style={styles.chevron} />
          </TouchableOpacity>
          <View style={styles.row}>
            <Ionicons name="code-working-outline" size={20} color={COLORS.primary} style={styles.rowIcon} />
            <Text style={styles.rowText}>App Version</Text>
            <Text style={styles.versionText}>1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: MARGIN_HORIZONTAL,
    paddingBottom: SPACING.xl * 2,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SPACING.md,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  profileName: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  profileEmail: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginBottom: SPACING.md,
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  editProfileText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginLeft: SPACING.xs,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
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
  versionText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginLeft: 8,
  },
  developerText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginLeft: 8,
  },
  websiteLink: {
    color: COLORS.primary,
  },
}); 