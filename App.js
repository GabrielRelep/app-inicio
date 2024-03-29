import {
  Comfortaa_400Regular,
  Comfortaa_700Bold,
  useFonts,
} from "@expo-google-fonts/comfortaa";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import AuthContext from "./src/contexts/auth";
import PopupContext from "./src/contexts/popup";
import Routes from "./src/routes/index";
import OneSignal from "react-native-onesignal";
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

OneSignal.setAppId(Constants.manifest.extra.oneSignalAppId);
OneSignal.promptForPushNotificationsWithUserResponse();

export default function App() {
  const [user, setUser] = useState(null);
  const [popup, setPopup] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
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
    } else {
      alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync()
  }, [])

  const [loaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_700Bold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ signed: !!user, user, setUser }}>
        <PopupContext.Provider value={{ popup, setPopup }}>
          <Routes />
        </PopupContext.Provider>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

// async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     messaging().getToken().then(token => {
  //       console.log(token);
  //     })
  //   }
  //   else {
  //     console.log("Failed token status", authStatus)
  //   }

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(async remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });

  //   messaging().onNotificationOpenedApp(async (remoteMessage) => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //   });

  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, [])
