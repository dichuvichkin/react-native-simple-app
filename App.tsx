import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperTheme,
  configureFonts,
} from 'react-native-paper';
import { AppLoading } from 'expo';
import { Feather } from '@expo/vector-icons';
import { useFonts } from '@use-expo/font';
import Login from './components/Login';

function Empty() {
  return null;
}

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Montserrat',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'MontserratBold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'MontserratLight',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'MontserratThin',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: '#01BFAC',
  },
};

const paperTheme = {
  ...PaperTheme,
  fonts: configureFonts(fontConfig as any),
  colors: {
    ...PaperTheme.colors,
    background: '#fff',
    primary: '#01BFAC',
  },
};

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          shadowOpacity: 0,
          elevation: 0,
          boxShadow: '',
        },
        headerTitleStyle: {
          fontFamily: 'MontserratBold',
        },
      }}
    >
      <ProfileStack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Вход',
        }}
      />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoaded] = useFonts({
    Montserrat: require('./assets/Montserrat-Regular.ttf'),
    MontserratBold: require('./assets/Montserrat-Bold.ttf'),
    MontserratLight: require('./assets/Montserrat-Light.ttf'),
    MontserratThin: require('./assets/Montserrat-Thin.ttf'),
  });

  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          initialRouteName="Profile"
          tabBarOptions={{
            style: {
              shadowOpacity: 0,
              elevation: 0,
              boxShadow: '',
            },
            labelStyle: {
              fontFamily: 'Montserrat',
            },
          }}
        >
          <Tab.Screen
            name="Main"
            component={Empty}
            options={{
              title: 'Главная',
              tabBarIcon: ({ color, size }) => (
                <Feather name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={Empty}
            options={{
              title: 'Поиск',
              tabBarIcon: ({ color, size }) => (
                <Feather name="search" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Cart"
            component={Empty}
            options={{
              title: 'Корзина',
              tabBarIcon: ({ color, size }) => (
                <Feather name="shopping-cart" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
              title: 'Профиль',
              tabBarIcon: ({ color, size }) => (
                <Feather name="user" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="More"
            component={Empty}
            options={{
              title: 'Еще',
              tabBarIcon: ({ color, size }) => (
                <Feather name="more-horizontal" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
