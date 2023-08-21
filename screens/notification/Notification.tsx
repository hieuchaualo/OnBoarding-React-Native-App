import FeatherIcon from "react-native-vector-icons/Feather";
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_BASE_URI, RootStackName, ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from '../../constants';
import { BottomNav, Button, Column, Row } from '../../components';
import { RootStackParamList } from '../../types';
import { Subscription } from 'expo-modules-core';

const notificationContents = [
  {
    title: "Do your exercise now",
    body: 'In a long day you do not do any exercise',
    data: { url: APP_BASE_URI + RootStackName.MiniTest, navigate: RootStackName.MiniTest },

  },
  {
    title: "Time to study",
    body: 'Don\'t forget to study today!',
    data: { url: APP_BASE_URI + RootStackName.MiniTest, navigate: RootStackName.MiniTest },
  }
]

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
      title: "Time to study",
      body: 'Don\'t forget to study today!',
      data: { url: APP_BASE_URI + RootStackName.MiniTest, navigate: RootStackName.MiniTest },
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

const storeDataToStorage = async (notificationCurrent: Notifications.Notification[]) => {
  try {
    const jsonValue = JSON.stringify(notificationCurrent);
    await AsyncStorage.setItem('notifications', jsonValue);
  } catch (error) {
    console.error(error)
  }
};

const clearDataStorage = async () => {
  try {
    await AsyncStorage.removeItem('notifications');
  } catch (error) {
    console.error(error)
  }
}

type NotificationProps = NativeStackScreenProps<RootStackParamList, RootStackName.Notification>;

const Notification: FC<NotificationProps> = ({ navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notifications, setNotifications] = useState<Notifications.Notification[]>([]);

  const notificationListener = useRef<Subscription>({ remove: () => { } });
  const responseListener = useRef<Subscription>({ remove: () => { } });

  const updateNotifications = async (notification: Notifications.Notification) => {
    const lastNotificationsRaw = await AsyncStorage.getItem('notifications')
    let lastNotifications = []
    if (lastNotificationsRaw) lastNotifications = JSON.parse(lastNotificationsRaw)
    const notificationCurrent = [...lastNotifications, notification]
    setNotifications(notificationCurrent)
    storeDataToStorage(notificationCurrent)
  }
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token ?? '')
    });

    (async () => {
      const lastNotificationsRaw = await AsyncStorage.getItem('notifications')
      if (lastNotificationsRaw) setNotifications(JSON.parse(lastNotificationsRaw))
    })()

    responseListener.current = Notifications.addNotificationResponseReceivedListener(_response => { });
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => updateNotifications(notification));

    return () => {
      setNotifications([])
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const clearAll = () => {
    clearDataStorage()
    setNotifications([])
  }

  return (
    <View style={{ flex: 1, backgroundColor: ThemeColors.light }}>
      <View style={{ padding: ThemeDimensions.positive2, paddingBottom: 0, }}>
        <Text style={ThemeStyles.h2}>
          Notifications
        </Text>
        {notifications.length > 0 && <Row>
          <Text style={{ ...ThemeStyles.b4, color: ThemeColors.secondary }} onPress={() => clearAll()}>
            <FeatherIcon name="x-circle" size={ThemeDimensions.positive3} /> Clear all
          </Text>
        </Row>
        }
      </View>

      <ScrollView>
        <View style={{ padding: ThemeDimensions.positive1, paddingTop: 0, }}>
          {notifications?.map(notification =>
            <TouchableOpacity key={notification.request.identifier} onPress={() => navigation.navigate(notification.request.content.data.navigate as any)}>
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
                  }}>
                    <FeatherIcon name="target" size={ThemeDimensions.positive8} color={ThemeColors.danger} />
                  </View>
                </Column>

                <Column style={{ paddingEnd: ThemeDimensions.positive2, }}>
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
            </TouchableOpacity>
          )}

          <Button
            style={{ padding: ThemeDimensions.positive2, margin: ThemeDimensions.positive1, }}
            title="Press to push a notification (5s)"
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