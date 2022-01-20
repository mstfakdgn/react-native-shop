import React,{useEffect} from "react";
import {View,ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import { useDispatch } from "react-redux";

const StartUpScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expirationDate} = transformedData;
            const datetimeExpry = new Date(expirationDate);

            if (datetimeExpry <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }
            props.navigation.navigate('Shop');

            const exprationTime = datetimeExpry.getTime() - new Date().getTime();
            dispatch(authActions.authenticate(userId, token, exprationTime));

        }
        tryLogin();
    },[useDispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default StartUpScreen;