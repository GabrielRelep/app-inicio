import * as BackgroundFetch from 'expo-background-fetch';
import * as taskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const TASK_NAME = "MY_TASK";

async function sendNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Nova chamada recebida',
      body: 'Abra o aplicativo para continuar',
      vibrate: 1,
      sound: true,
    },
    trigger: {
      seconds: 2,
    }
  });
}

async function playSound() {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require('../../../assets/popup.mp3'));
    await soundObject.playAsync();
  } catch (error) {
    console.log(error);
  }
}

taskManager.defineTask(TASK_NAME, async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");

  socket = io(`https://chevette.herokuapp.com/drivers`, {
    auth: {
      accessToken,
    },
    transports: ['websocket'],
  });

  socket.on('connect', async () => {
    try {
      if (socket.connected) {
        console.log("Conectado");
      } else {
        console.log("Desconectado");
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('receive-trip', () => {
    sendNotification();
    playSound();
  });

  try {
    const receivedNewData = "my task oi: " + Math.random();
    return receivedNewData ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.NoData;
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

const register = () => {
  return BackgroundFetch.registerTaskAsync(TASK_NAME, {
    minimumInterval: 1,
    stopOnTerminate: false,
  });
};

const unregister = () => {
  return BackgroundFetch.unregisterTaskAsync(TASK_NAME);
};

export function registerMyTask() {
  register()
    .then(() => console.log("Task registered"))
    .catch(error => console.log(error));
}

export function unregisterMyTask() {
  unregister()
    .then(() => console.log("Task unregistered"))
    .catch(error => console.log(error));
}
