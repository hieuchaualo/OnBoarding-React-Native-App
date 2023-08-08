import React, { FC, useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Spacing from "../../constants/Spacing";
import Colors from "../../constants/Colors";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackName, ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from '../../constants';
import { IAccount } from '../../interfaces';
import { deleteItemAsync } from 'expo-secure-store';
import { BottomNav, Button } from '../../components';
import { RootStackParamList } from '../../types';
import { AxiosResponse } from 'axios';
import { getAccount } from '../../api';
import { toImgUrl } from '../../utils';

const items = [
  { id: 'settings', icon: 'settings', label: 'Settings', type: 'link' },
  { id: 'help-circle', icon: 'help-circle', label: 'Helps', type: 'link' },
  { id: 'log-out', icon: 'log-out', label: 'Logout', type: 'link' },
];


type ProfileProps = NativeStackScreenProps<RootStackParamList, "Profile">;

const Profile: FC<ProfileProps> = ({ navigation }) => {
  const { navigate } = navigation;
  const [account, setAccount] = useState<IAccount>();

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response: AxiosResponse<any, any> = await getAccount();
        if (response?.status === 200) {
          const responseData = response.data.data
          setAccount(responseData)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchAccount()
  }, [])

  const logout = () => {
    deleteItemAsync('secure_token')
      .then(() => deleteItemAsync('account'))
      .then(() => navigate(RootStackName.Welcome))
  }

  return (
    <View style={{ backgroundColor: ThemeColors.light, flex: 1 }}>
      <ScrollView>
        <View style={{ padding: ThemeDimensions.positive2, paddingBottom: 0, }}>
          <Text style={ThemeStyles.h2}>
            Profile
          </Text>
        </View>

        <View style={styles.profile}>
          <Image
            source={{ uri: toImgUrl(account?.avatar)}}
            style={styles.profileAvatar}
          />

          <Text style={styles.profileName}>
            {account?.name}
          </Text>

          <Text style={styles.profileEmail}>
            {account?.email}
          </Text>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>

              <FeatherIcon color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>
        </View>


        <View style={{
          padding: ThemeDimensions.positive3,
        }}>
          {items.map(({ id, label, icon, type }, index) => <Button
            key={id}
            onPress={() => {
              // handle onPress
            }}
            style={{
              flexDirection: 'row',
              padding: ThemeDimensions.positive2,
              marginVertical: ThemeDimensions.positive1,
              shadowColor: ThemeColors.dark
            }}
            background={ThemeColors.grey}
            backgroundHover={ThemeColors.primaryLight}
          >
            <FeatherIcon
              color={ThemeColors.dark}
              name={icon}
              size={ThemeDimensions.fontSize.xl}
            />
            <Text style={{
              fontSize: ThemeDimensions.fontSize.lg,
              fontFamily: ThemeFonts.semiBold,
              paddingStart: ThemeDimensions.positive2
            }}>
              {label}
            </Text>
          </Button>)}

          <Button
            onPress={logout}
            style={{
              flexDirection: 'row',
              padding: ThemeDimensions.positive2,
              marginVertical: ThemeDimensions.positive1,
              shadowColor: ThemeColors.dark
            }}
            background={ThemeColors.grey}
            backgroundHover={ThemeColors.primaryLight}
          >
            <FeatherIcon
              color={ThemeColors.dark}
              name='log-out'
              size={ThemeDimensions.fontSize.xl}
            />
            <Text style={{
              fontSize: ThemeDimensions.fontSize.lg,
              fontFamily: ThemeFonts.semiBold,
              paddingStart: ThemeDimensions.positive2
            }}>
              Logout real
            </Text>
          </Button>
        </View>
      </ScrollView >

      <BottomNav navigate={navigate} activeKey={RootStackName.Profile} />
    </View >
  );
}

export { Profile };

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fff',
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#090909',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  buttoncontainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    // paddingRight: 24,
    // height: 50,
    padding: Spacing * 1.5,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing * 1,
    marginRight: Spacing * 2,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ffffff',
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  rowValue: {
    fontSize: 17,
    color: '#ffffff',
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});