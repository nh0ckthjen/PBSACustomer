import React from "react";
import { Root } from "native-base";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { StatusBar } from "react-native";

import Home from '../screens/home/Home';
import Login from '../screens/login/Login';
import AuthLoadingScreen from '../screens/AuthLoadingScreen'

const AppNavigator = createAppContainer(createStackNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Home :{
            screen: Home,
            navigationOptions: {
                header: null,
            }
        },
        Login :{
            screen: Login,
            navigationOptions: {
                header: null,
            }
        }

    }, {
        initialRouteName : 'AuthLoading'
    }));
export default () =>
    <Root>
        <StatusBar hidden/>
        <AppNavigator />
    </Root>;
