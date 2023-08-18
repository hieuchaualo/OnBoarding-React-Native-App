import FeatherIcon from "react-native-vector-icons/Feather";
import * as Notifications from 'expo-notifications';
import { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_BASE_URI, RootStackName, ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from '../../constants';
import { BottomNav, Button, Column, Row } from '../../components';
import { RootStackParamList } from '../../types';
import { Subscription } from 'expo-modules-core';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Do your exercise now",
      body: 'In a long day you do not do any exercise',
      data: { url: APP_BASE_URI + RootStackName.MiniTest },
    },
    trigger: { seconds: 5 },
  });
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: ThemeColors.light,
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

type NotificationProps = NativeStackScreenProps<RootStackParamList, RootStackName.Notification>;

const Notification: FC<NotificationProps> = ({ navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);

  const notificationListener = useRef<Subscription>({ remove: () => { } });
  const responseListener = useRef<Subscription>({ remove: () => { } });

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token ?? ''));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => setNotification(notification));
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: ThemeColors.light }}>
      <View style={{ padding: ThemeDimensions.positive2, paddingBottom: 0, }}>
        <Text style={ThemeStyles.h2}>
          Notifications
        </Text>
      </View>

      <ScrollView>
        <View style={{ padding: ThemeDimensions.positive1, paddingTop: 0, }}>
          <Row
            style={{
              margin: ThemeDimensions.positive1,
              backgroundColor: ThemeColors.white,
              borderRadius: ThemeDimensions.positive1,
            }}
          >
            <Column style={{ flex: undefined }}>
              <View style={{
                padding: ThemeDimensions.positive2,
                borderTopLeftRadius: ThemeDimensions.positive1,
                borderBottomLeftRadius: ThemeDimensions.positive1,
                backgroundColor: ThemeColors.pinkLight,
              }}>
                <FeatherIcon name="frown" size={ThemeDimensions.positive8} color={ThemeColors.danger} />
              </View>
            </Column>

            <Column style={{ paddingHorizontal: ThemeDimensions.positive2, }}>
              <Row>
                <Text numberOfLines={2} style={{
                  fontFamily: ThemeFonts.semiBold,
                  fontSize: ThemeDimensions.fontSize.md,
                  color: ThemeColors.dark,
                  width: ThemeDimensions.percentage100,
                }}>
                  {notification && notification.request.content.title}
                </Text>
              </Row>

              <Row>
                <Text style={{
                  fontFamily: ThemeFonts.regular,
                  fontSize: ThemeDimensions.fontSize.md,
                  color: ThemeColors.secondary,
                  width: ThemeDimensions.percentage100,
                }}>
                  {notification && notification.request.content.body}
                </Text>
              </Row>
            </Column>
          </Row>

          <Text>Your expo push token: {expoPushToken}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
          </View>
          <Button
            title="Press to schedule a notification"
            onPress={async () => {
              await schedulePushNotification();
            }}
          />
        </View>
      </ScrollView>
      <BottomNav navigate={navigation.navigate} activeKey={RootStackName.Notification} />
    </View>
  );
}

export { Notification };