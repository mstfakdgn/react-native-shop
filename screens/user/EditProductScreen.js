import React, { useEffect, useCallback, useReducer, useState} from "react";
import { View, Text, StyleSheet, ScrollView, TextInput,Alert,KeyboardAvoidingView,ActivityIndicator,Button } from 'react-native';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../store/actions/products";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";

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

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const prodId = props.navigation.getParam('productId');

    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const [formState, dispatchFormState] = useReducer(
        formReducer, 
        {
            inputValues:{
                title:editedProduct ? editedProduct.title : '',
                imageUrl:editedProduct ? editedProduct.imageUrl : '',
                description:editedProduct ? editedProduct.description : '',
                price:''
            }, 
            inputValidities:{
                title: editedProduct ? true : false,
                imageUrl: editedProduct ? true : false,
                description: editedProduct ? true : false,
                price: editedProduct ? true : false,
            }, 
            formIsValid: editedProduct ? true : false
        }
    )


    const dispatch = useDispatch();
    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('wrong input', 'please check the errors in the form', [{text:'Okay'}])
            return;
        }
        if (editedProduct) {
            setIsLoading(true);
            dispatch(productActions.editProduct(
                prodId, 
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl
            )).then(res => {
                setIsLoading(false);
                setError(null)
                props.navigation.goBack();

            }).catch(err => {
                setError(err.toString());
            });

        } else {
            setIsLoading(true);
            dispatch(productActions.addProduct(
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl, 
                +formState.inputValues.price)).then(res => {
                    setIsLoading(false);
                    setError(null)
                    props.navigation.goBack();

                }).catch(err => {
                    setError(err.toString())
            });
        }
        // props.navigation.navigate('userProducts');
        
        
    }, [dispatch,prodId, formState])

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler});
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
                type:FORM_UPDATE, 
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
        });
    }, [dispatchFormState]);
    if(error != null) {
        return (
            <View style={styles.loader}>
                <Text>{error}</Text>
                <Button title="Try again" onPress={() => {props.navigation.goBack()}}/>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === " ios" ? "padding" : "height"} keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}> 
                    <Input 
                        id='title'
                        label='Title'
                        errorText='Please Enter a valid title!'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initalValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={editedProduct ? true : false}
                        required
                    />
                    <Input
                        id='imageUrl'
                        label='Image Url'
                        errorText='Please Enter a valid url!'
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initalValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={editedProduct ? true : false}
                        required

                    />
                    {editedProduct ? null : <Input
                        id='price'
                        label='Price'
                        errorText='Please Enter a valid number for price!'
                        keyboardType='decimal-pad'
                        returnKeyType='next'
                        initalValue={editedProduct ? editedProduct.price : ''}
                        onInputChange={inputChangeHandler}
                        required
                        min={0.1}
                    />}
                    <Input
                        id='description'
                        label='Description'
                        errorText='Please Enter a valid description!'
                        keyboardType='default'
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initalValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={editedProduct ? true : false}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

EditProductScreen.navigationOptions = (navData) => {
    const submitFn = navData.navigation.getParam('submit');
    const prodId = navData.navigation.getParam('productId');
    return {
        headerTitle: prodId ? 'Edit Product' : 'Create Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title='Save' 
                    iconName= {Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    color= {Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPress={submitFn}
                />
            </HeaderButtons>
        )
    }
}

const styles= StyleSheet.create({
    form: {
        margin: 20
    },
    loader: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default EditProductScreen;