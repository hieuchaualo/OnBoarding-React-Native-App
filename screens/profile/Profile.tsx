import React, { FC, useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackName, ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from '../../constants';
import { IAccount } from '../../interfaces';
import { deleteItemAsync } from 'expo-secure-store';
import { BottomNav, Button, Column, Row } from '../../components';
import { RootStackParamList } from '../../types';
import { AxiosResponse } from 'axios';
import { getAccount } from '../../api';
import { toImgUrl } from '../../utils';

const items = [
  { id: 'settings', icon: 'settings', label: 'Settings', type: 'link' },
  { id: 'help-circle', icon: 'help-circle', label: 'Helps', type: 'link' },
];


type ProfileProps = NativeStackScreenProps<RootStackParamList, "Profile">;

const Profile: FC<ProfileProps> = ({ navigation }) => {
  const { navigate } = navigation;
  const [account, setAccount] = useState<IAccount>();

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

  useEffect(() => {
    const autoFetchAccountOnFocus = navigation.addListener('focus', () => {
      fetchAccount()
    });
    return () => navigation.removeListener('focus', autoFetchAccountOnFocus)
  }, [navigation])

  const logout = () => {
    deleteItemAsync('secure_token')
      .then(() => deleteItemAsync('account'))
      .then(() => navigate(RootStackName.Welcome))
  }

  return (
    <View style={{ backgroundColor: ThemeColors.light, flex: 1 }}>
      <ScrollView>
        <Column style={{
          padding: ThemeDimensions.positive3,
          backgroundColor: ThemeColors.white,
          borderBottomRightRadius: ThemeDimensions.positive3,
          borderBottomLeftRadius: ThemeDimensions.positive3,
        }}>
          <Image
            source={account?.avatar
              ? { uri: toImgUrl(account?.avatar) }
              : require("../../assets/images/avatar.jpg")
            }
            style={{
              height: ThemeDimensions.positive20,
              width: ThemeDimensions.positive20,
              borderRadius: ThemeDimensions.positive10,
            }}
          />

          <Text style={{ ...ThemeStyles.h1, marginTop: ThemeDimensions.positive2 }}>
            {account?.name ?? 'Unnamed'}
          </Text>

          <Text style={{ ...ThemeStyles.c4, color: ThemeColors.secondary, marginBottom: ThemeDimensions.positive1 }}>
            {account?.email ?? 'default@free.dom'}
          </Text>

          <Button onPress={() => navigate(RootStackName.ProfileUpdate)} style={{
            paddingVertical: ThemeDimensions.positive1,
            paddingHorizontal: ThemeDimensions.positive2,
          }}>
            <Row>
              <Text style={{
                fontSize: ThemeDimensions.fontSize.lg,
                fontFamily: ThemeFonts.semiBold,
                color: ThemeColors.light,
              }}>
                Edit Profile
                { }
              </Text>
              <FeatherIcon name="edit" style={{
                color: ThemeColors.light,
                paddingBottom: 4,
                paddingLeft: 4,
              }} />
            </Row>
          </Button>
        </Column>


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
              Logout
            </Text>
          </Button>
        </View>
      </ScrollView >

      <BottomNav navigate={navigate} activeKey={RootStackName.Profile} />
    </View >
  );
}

export { Profile };