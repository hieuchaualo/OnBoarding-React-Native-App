import React, { FC, useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackName, ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from '../../constants';
import { IAccount } from '../../interfaces';
import { Button, Column, Row } from '../../components';
import { PasswordField, TextField } from './components';
import { RootStackParamList } from '../../types';
import { AxiosResponse } from 'axios';
import { getAccount, updateAccount, updateAccountAvatar } from '../../api';
import { toImgUrl } from '../../utils';


type ProfileUpdateProps = NativeStackScreenProps<RootStackParamList, RootStackName.ProfileUpdate>;

const ProfileUpdate: FC<ProfileUpdateProps> = ({ navigation }) => {
  const { navigate } = navigation;
  const [account, setAccount] = useState<IAccount>();
  const [accountName, setAccountName] = useState<string>('');
  const [accountPassword, setAccountPassword] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response: AxiosResponse<any, any> = await getAccount();
        if (response?.status === 200) {
          const responseData: IAccount = response.data.data
          setAccount(responseData)
          setAccountName(responseData.name)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchAccount()
  }, [])

  const pickNewAvatar = async () => {
    try {
      // No permissions request is necessary for launching the image library
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const fileUri = result.assets[0].uri

        const uriParts = fileUri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const file: any = {
          name: fileUri.split('/').pop() as string,
          type: 'image/' + fileType,
          uri: Platform.OS === 'android' ? fileUri : fileUri.replace('file://', ''),
        }

        const formData = new FormData();
        formData.append('_id', account?._id ?? '')
        formData.append('avatar', file);
        await updateAccountAvatar(formData)
        setAvatar(fileUri);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleOnSave = async () => {
    try {
      const formData: { _id?: string; name?: string; password?: string } = {
        _id: account?._id,
        name: accountName,
        password: accountPassword,
      }
      if (!formData.name) delete formData.name
      if (!formData.password) delete formData.password

      const response = await updateAccount(formData)
      if (response.status === 200) {
        navigate(RootStackName.Profile)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={{ backgroundColor: ThemeColors.light, flex: 1 }}>
      <ScrollView>
        <Column style={{
          padding: ThemeDimensions.positive1,
        }}>
          <View style={{
            height: ThemeDimensions.positive16,
            backgroundColor: ThemeColors.yellowLemon,
            width: ThemeDimensions.windowWidth,
            position: 'absolute',
            left: 0,
            top: 0,
          }} />
          <View style={{
            height: ThemeDimensions.positive5,
            width: ThemeDimensions.windowWidth,
            alignItems: 'flex-end',
            paddingEnd: ThemeDimensions.positive2,
          }}>
            <Feather
              name="x-circle"
              size={ThemeDimensions.positive5}
              color={ThemeColors.secondary}
              onPress={() => navigation.goBack()}
            />
          </View>
          <Pressable onPress={() => pickNewAvatar()}>
            <View style={{
              backgroundColor: ThemeColors.secondary,
              borderRadius: ThemeDimensions.positive10,
              position: 'absolute',
              left: 0,
              top: 0,
            }}>
              <Image
                source={{ uri: avatar || toImgUrl(account?.avatar) }}
                style={{
                  height: ThemeDimensions.positive20,
                  width: ThemeDimensions.positive20,
                  borderRadius: ThemeDimensions.positive10,
                }}
              />
            </View>

            <View style={{ backgroundColor: '#0005', borderRadius: ThemeDimensions.positive10, }}>
              <Row style={{
                height: ThemeDimensions.positive20,
                width: ThemeDimensions.positive20,
                alignItems: 'center',
              }}>
                <MaterialCommunityIcons
                  name="image-edit-outline"
                  color={ThemeColors.light}
                  size={ThemeDimensions.positive8}
                />
              </Row>
            </View>
          </Pressable>
        </Column>

        <View style={{
          padding: ThemeDimensions.positive3,
        }}>

          <Text style={{ ...ThemeStyles.b4, color: ThemeColors.third, marginTop: ThemeDimensions.positive2 }}>
            Email
          </Text>
          <TextField value={account?.email ?? ''} handleOnChange={() => { }} editable={false} />

          <Text style={{ ...ThemeStyles.b4, color: ThemeColors.third, marginTop: ThemeDimensions.positive2 }}>
            Name
          </Text>
          <TextField value={accountName} handleOnChange={setAccountName} />

          <Text style={{ ...ThemeStyles.b4, color: ThemeColors.third, marginTop: ThemeDimensions.positive2 }}>
            Password
          </Text>
          <PasswordField value={accountPassword} handleOnChange={setAccountPassword} />

          <Row style={{ marginTop: ThemeDimensions.positive2 }}>
            <Column style={{ alignItems: 'flex-start' }}>
              <Button
                onPress={() => navigation.goBack()}
                style={{
                  flexDirection: 'row',
                  width: ThemeDimensions.percentage95,
                  padding: ThemeDimensions.positive2,
                  marginVertical: ThemeDimensions.positive1,
                  shadowColor: ThemeColors.dark
                }}
                background={ThemeColors.grey}
                backgroundHover={ThemeColors.pinkLight}
              >
                <Feather
                  color={ThemeColors.dark}
                  name='x'
                  size={ThemeDimensions.fontSize.xl}
                />
                <Text style={{
                  fontSize: ThemeDimensions.fontSize.lg,
                  fontFamily: ThemeFonts.semiBold,
                  paddingStart: ThemeDimensions.positive1,
                }}>
                  Cancel
                </Text>
              </Button>
            </Column>

            <Column style={{ alignItems: 'flex-end' }}>
              <Button
                onPress={handleOnSave}
                style={{
                  flexDirection: 'row',
                  width: ThemeDimensions.percentage100,
                  padding: ThemeDimensions.positive2,
                  marginVertical: ThemeDimensions.positive1,
                  shadowColor: ThemeColors.dark
                }}
                background={ThemeColors.primary}
                backgroundHover={ThemeColors.primaryLight}
              >
                <Feather
                  color={ThemeColors.light}
                  name='check'
                  size={ThemeDimensions.fontSize.xl}
                />
                <Text style={{
                  fontSize: ThemeDimensions.fontSize.lg,
                  fontFamily: ThemeFonts.semiBold,
                  paddingStart: ThemeDimensions.positive1,
                  color: ThemeColors.light,
                }}>
                  Save change
                </Text>
              </Button>
            </Column>
          </Row>
        </View>
      </ScrollView >
    </View >
  );
}

export { ProfileUpdate };