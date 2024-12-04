import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import WelcomeScreen from './components/WelcomeScreen';

export default function Index() {

  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar style='dark' />
      <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: 'lightblue' },
            headerTintColor: 'pink',
            contentStyle: { backgroundColor: 'pink' }
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
        </Stack.Navigator>
    </>

  );
}
