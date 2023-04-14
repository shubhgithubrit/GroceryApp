import PushNotification from 'react-native-push-notification';
    
    export  const createChannels = () => {
        PushNotification.createChannel({
          channelId: 'test-channel',
          channelName: 'Test Channel',
        });
      };
    
     export const handleNotification = (name,msg) => {
        PushNotification.localNotification({
          channelId: 'test-channel',
          title: name,
          message: msg,
        });
      };
// }