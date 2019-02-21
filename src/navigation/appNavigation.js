import React from "react";
import { Root } from "native-base";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { StatusBar } from "react-native";

import Home from '../screens/home/Home';
import Login from '../screens/login/Login';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import Booking from '../screens/booking/Booking';
import News from '../screens/news/News';
import Menu from '../screens/menu/Menu';
import BarberInfo from '../screens/barberInfo/BarberInfo';
import chooseService from "../screens/booking/chooseService";
import chooseTime from "../screens/booking/chooseTime";

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
        },
        Booking :{
            screen: Booking,
            navigationOptions: {
                header: null,
            }
        },
        News :{
            screen: News,
            navigationOptions: {
                header: null,
            }
        },
        Menu :{
            screen: Menu,
            navigationOptions: {
                header: null,
            }
        },
        BarberInfo: {
            screen: BarberInfo,
            navigationOptions: {
                header: null,
            }
        },
        chooseService :{
            screen: chooseService,
            navigationOptions: {
                header: null,
            }
        },
        chooseTime:{
            screen: chooseTime,
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
