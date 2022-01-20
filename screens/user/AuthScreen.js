import React, {useReducer,useCallback,useState, useEffect} from "react";
import { ScrollView,View, KeyboardAvoidingView, StyleSheet,Text,Platform,Button,ActivityIndicator,Alert } from "react-native";
import Input from '../../components/UI/Input';
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import {  useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';

const FORM_UPDATE = 'FORM_UPDATE'

    const formReducer = (state, action) => {
        if (action.type === FORM_UPDATE) {
            const updatedValues = {
                ...state.inputValues,
                [action.input]: action.value
            };

            const updatedValidities = {
                ...state.inputValidities,
                [action.input]: action.isValid
            }

            let updatedFormIsValid = true;
            for(const key in updatedValidities) {
                updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
            }
            return {
                ...state,
                inputValues:updatedValues,
                inputValidities:updatedValidities,
                formIsValid:updatedFormIsValid
            };
        }
        return state;
    }

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loginMode, setLoginMode] = useState(true);

    const [formState, dispatchFormState] = useReducer(
        formReducer, 
        {
            inputValues:{
                email: '',
                password: '',
            }, 
            inputValidities:{
                email: false,
                password: false,
            }, 
            formIsValid: false
        }
    )

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occured!', error, [{text:'Ok'}])
        }
    }, [error])

    const dispatch = useDispatch();

    const signUpHandler = () => {
        setIsLoading(true);
        if (loginMode) {
            dispatch(authActions.logIn(formState.inputValues.email, formState.inputValues.password)).then(res => {
                setIsLoading(false);
                setError(null);
                props.navigation.navigate('Shop');
            }).catch(err => {
                setIsLoading(false);
                setError(err.message);
            });
        } else {
            dispatch(authActions.signUp(formState.inputValues.email, formState.inputValues.password)).then(res => {
                setIsLoading(false);
                setError(null);
                props.navigation.navigate('Shop');
            }).catch(err => {
                setIsLoading(false);
                setError(err.message);
            });
        }
    }

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
                type:FORM_UPDATE, 
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
        });
    }, [dispatchFormState]);

    // if(error) {
    //     return (
    //         <View style={styles.loader}>
    //             <Text>Error</Text>
    //             <Button title="Try again" onPress={() => {}}/>
    //         </View>
    //     );
    // }

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView 
            style={{flex:1, alignItems:'center', justifyContent:'center'}} 
            behavior={Platform.OS === " ios" ? "padding" : "height"} 
            keyboardVerticalOffset={50}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input 
                            id="email" 
                            label="Email" 
                            keyboardType="email-address" 
                            required 
                            email 
                            autoCapitalize="none"
                            errorText="Please enter a valid email"
                            onInputChange={inputChangeHandler}
                            initalValue=""/>
                        <Input 
                            id="password" 
                            label="Password"
                            keyboardType="default" 
                            secureTextEntry 
                            required
                            minLength={5}
                            errorText="Please enter a valid password"
                            onInputChange={inputChangeHandler}
                            initalValue=""/>
                        <View style={styles.actions}>
                            <View style={styles.buttonContainer}>
                                <Button color={Colors.primary} title={loginMode ? "Login" : "Sign Up"} onPress={signUpHandler}/>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button color={Colors.accent} title={loginMode ? "Switch to Sign Up" : "Switch to Log In"} onPress={() => setLoginMode(loginMode => !loginMode)}/>
                            </View>
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

AuthScreen.navigationOptions = {
    headerTitle:'Authenticate'
}

const styles = StyleSheet.create({
    authContainer: {
        height: '80%',
        width: '80%',
        maxWidth:400,
        maxHeight:400,
        padding: 20
    },
    actions: {
        marginTop:'40%',
        width: '100%'
    },
    gradient: {
        width: '100%',
        height: '100%',
        alignItems:'center',
        justifyContent:'center',
    },
    buttonContainer: {
        marginTop:10
    },
    loader: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default AuthScreen;