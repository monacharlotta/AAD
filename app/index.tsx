import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import WelcomeScreen from './components/WelcomeScreen';
import Colors from './constants/Colors';
import RegisterScreen from './components/RegisterScreen';

export default function Index() {

  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar style='light' />
      <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.buttonBackground },
            headerTintColor: Colors.primaryBackground,
            contentStyle: { backgroundColor: Colors.primaryBackground }
          }}
          initialRouteName='welcome'>
          <Stack.Screen
            name='login'
            component={LoginScreen}
            options={{ title: 'Login' }} />
            <Stack.Screen
            name='welcome'
            component={WelcomeScreen}
            options={{ title: 'Welcome!' }} />
            <Stack.Screen
            name='register'
            component={RegisterScreen}
            options={{ title: 'Register' }} />
        </Stack.Navigator>
    </>

  );
}
