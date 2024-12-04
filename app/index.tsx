import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import WelcomeScreen from './components/WelcomeScreen';
import Colors from './constants/Colors';
import RegisterScreen from './components/RegisterScreen';
import OverviewScreen from './components/OverviewScreen';
import AddExpenseIncomeScreen from './components/AddExpenseIncomeScreen';

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
        <Stack.Screen
          name='overview'
          component={OverviewScreen} 
          options={{ title: 'Overview' }} /> 
          <Stack.Screen
          name='addExpense'
          component={AddExpenseIncomeScreen} 
          options={{ title: 'Add Expense' }} /> 
      </Stack.Navigator>
    </>

  );
}
