import * as Notifications from 'expo-notifications';
import { Linking, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { APP_BASE_URI, RootStackName, ThemeColors } from "../constants";
import { RootStackParamList } from "../types";
import {
  WelcomeScreen,
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  TestHistory,
  MinitestScreen,
  Exercises,
  Result,
  QuizGame,
  HowToPlayQuizGame,
  PlayQuizGame,
  ReadingTip,
  ReadingTipDetail,
  Profile,
  ProfileUpdate,
  Notification,
} from "../screens";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const RootStack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={ThemeColors.light}
        barStyle={'dark-content'}
      />
      <NavigationContainer
        theme={{
          ...DefaultTheme, colors: {
            ...DefaultTheme.colors,
            background: ThemeColors.white,
            primary: ThemeColors.primary,
          }
        }}
        linking={{
          prefixes: [APP_BASE_URI],
          async getInitialURL() {
            // First, you may want to do the default deep link handling
            // Check if app was opened from a deep link
            const url = await Linking.getInitialURL();
            if (url != null) return url;

            // Handle URL from expo push notifications
            const response: any = await Notifications.getLastNotificationResponseAsync();

            return response?.notification.request.content.data.url;
          },
          subscribe(listener) {
            const onReceiveURL = ({ url }: { url: string }) => listener(url);

            // Listen to incoming links from deep linking
            const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

            // Listen to expo push notifications
            const subscription = Notifications.addNotificationResponseReceivedListener(response => {
              const url: any = response.notification.request.content.data.url;

              // Any custom logic to see whether the URL needs to be handled
              //...

              // Let React Navigation handle the URL
              listener(url);
            });

            return () => {
              // Clean up the event listeners
              eventListenerSubscription.remove();
              subscription.remove();
            };
          },
        }}
      >
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name={RootStackName.Welcome} component={WelcomeScreen} />
          <RootStack.Screen name={RootStackName.Login} component={LoginScreen} options={{ gestureEnabled: false }} />
          <RootStack.Screen name={RootStackName.Register} component={RegisterScreen} />
          <RootStack.Screen name={RootStackName.Home} component={HomeScreen} options={{ gestureEnabled: false }} />
          <RootStack.Screen name={RootStackName.MiniTest} component={MinitestScreen} />
          <RootStack.Screen name={RootStackName.Exercises} component={Exercises} options={{ freezeOnBlur: true }} />
          <RootStack.Screen name={RootStackName.Result} component={Result} options={{ gestureEnabled: false }} />
          <RootStack.Screen name={RootStackName.QuizGame} component={QuizGame} />
          <RootStack.Screen name={RootStackName.HowToPlayQuizGame} component={HowToPlayQuizGame} />
          <RootStack.Screen name={RootStackName.PlayQuizGame} component={PlayQuizGame} />
          <RootStack.Screen name={RootStackName.ReadingTip} component={ReadingTip} />
          <RootStack.Screen name={RootStackName.ReadingTipDetail} component={ReadingTipDetail} />
          <RootStack.Screen name={RootStackName.TestHistory} component={TestHistory} options={{ animation: 'none' }} />
          <RootStack.Screen name={RootStackName.Notification} component={Notification} options={{ animation: 'none' }} />
          <RootStack.Screen name={RootStackName.Profile} component={Profile} options={{ animation: 'none' }} />
          <RootStack.Screen name={RootStackName.ProfileUpdate} component={ProfileUpdate} options={{ animation: 'slide_from_bottom' }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView >
  );
}
