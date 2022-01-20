import React from 'react';
import { Platform, SafeAreaView,View,Text,ScrollView, Image,Button } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import ProductsOverScreen from '../screens/shop/ProductsOverScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import AuthScreen from '../screens/user/AuthScreen';
import Colors from '../constants/Colors';
import EditProductScreen from '../screens/user/EditProductScreen';
import StartUpScreen from '../screens/StartUpScreen';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/actions/auth';
import TableScreen from '../screens/TableScreen';

const ProductsNavigator = createStackNavigator({
    products: {
        screen:ProductsOverScreen
    },
    productDetail: {
        screen:ProductDetailScreen
    },
    cart: {
        screen:CartScreen
    }
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons 
                                        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                                        size={21}
                                        color={drawerConfig.tintColor}
                                    />
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTitleStyle: {
            fontFamily:'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily:'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

const OrderStackNavigator = createStackNavigator({
    orders: {
        screen:OrderScreen
    }
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons 
                                        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                                        size={21}
                                        color={drawerConfig.tintColor}
                                    />
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTitleStyle: {
            fontFamily:'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily:'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

const UserProductStackNavigator = createStackNavigator({
    userProducts: {
        screen:UserProductsScreen
    },
    productDetail: {
        screen:ProductDetailScreen
    },
    editProduct: {
        screen: EditProductScreen
    }
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons 
                                        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                                        size={21}
                                        color={drawerConfig.tintColor}
                                    />
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTitleStyle: {
            fontFamily:'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily:'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

const TableStackNavigator = createStackNavigator({
    Table:TableScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons 
                                        name={Platform.OS === 'android' ? 'md-archive' : 'ios-archive'}
                                        size={21}
                                        color={drawerConfig.tintColor}
                                    />
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTitleStyle: {
            fontFamily:'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily:'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

const MainDrawerNavigator = createDrawerNavigator({
    Products:{
        screen: ProductsNavigator,
        navigationOptions: {
            drawerLabel:'Products'
        }
    },
    Orders: {
        screen: OrderStackNavigator,
        navigationOptions: {
            drawerLabel:'Orders'
        }
    },
    UserProducts:{
        screen: UserProductStackNavigator,
        navigationOptions: {
            drawerLabel:'User Products'
        }
    },
    TableExample: {
        screen: TableStackNavigator,
        navigationOptions: {
            drawerLabel:'Table Example'
        }
    }
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold',
            marginTop:20
        },
    },
    contentComponent: (props) => {
        const dispatch = useDispatch();
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={{height: 100,alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../assets/favicon.png')}/>
                </View>
            <ScrollView>
                <DrawerItems {...props} />
                <Button title="Log Out" color={Colors.primary} style={{paddingTop:30}} onPress={() => {
                    dispatch(logOut);
                    props.navigation.navigate('Auth');
                }}/>
            </ScrollView>
            </SafeAreaView>
        );
        }
})

const AuthStackNavigator = createStackNavigator({
    Auth:AuthScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTitleStyle: {
            fontFamily:'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily:'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

const MainNavigator = createSwitchNavigator({
    StartUp:StartUpScreen,
    Auth:AuthStackNavigator,
    Shop:MainDrawerNavigator
});

export default createAppContainer(MainNavigator);