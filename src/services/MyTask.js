import * as BackgroundFetch from 'expo-background-fetch';
import * as taskManager from 'expo-task-manager';

const TASK_NAME = "MY_TASK";

taskManager.defineTask(TASK_NAME, () => {
    try {
        const receivedNewData = "my task: " + Math.random();
        console.log(receivedNewData);
        return receivedNewData ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.NoData
    } catch (error) {
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
})

const register = () => {
    return BackgroundFetch.registerTaskAsync(TASK_NAME, {
        minimumInterval: 2,
        stopOnTerminate: false,
    })
}

const unregister = () => {
    return BackgroundFetch.unregisterTaskAsync(TASK_NAME)
}

export default {
    register,
    unregister,
}