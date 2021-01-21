import AsyncStorage from '@react-native-async-storage/async-storage';

async function GetEmail() {
    try {
        const value = await AsyncStorage.getItem('email');
        if(value !== null) {
            return value;
        }
      } catch(e) {
      console.log(e)
    }
}

export { GetEmail };  
    
