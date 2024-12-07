import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './components/LoginScreen';
import WelcomeScreen from './components/WelcomeScreen';
import Colors from './constants/Colors';
import RegisterScreen from './components/RegisterScreen';
import OverviewScreen from './components/OverviewScreen';
import AddExpenseIncomeScreen from './components/AddExpenseIncomeScreen';
import ContextProvider from './store/Context';

export default function Index() {

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const DrawerNavigator = () => (
    <Drawer.Navigator>
      <Drawer.Screen
      name='overview'
      component={OverviewScreen}
      options={{ title: 'Yleisnäkymä' }} />
      <Drawer.Screen
          name='addExpense'
          component={AddExpenseIncomeScreen} 
          options={{ title: 'Lisää menoerä' }} /> 
    </Drawer.Navigator>
  );

  return (
    <ContextProvider>
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
          options={{ title: 'Kirjaudu sisään' }} />
        <Stack.Screen
          name='welcome'
          component={WelcomeScreen}
          options={{ title: 'Tervetuloa!' }} />
        <Stack.Screen
          name='register'
          component={RegisterScreen}
          options={{ title: 'Rekisteröidy' }} />
        <Stack.Screen
          name='overviewDrawer'
          component={DrawerNavigator}
          options={{ headerShown: false }} /> 
      </Stack.Navigator>
    </ContextProvider>
  );
}
