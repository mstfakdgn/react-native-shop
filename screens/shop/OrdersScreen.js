import React, {useEffect, useState} from "react";
import { FlatList,Text,StyleSheet,Button,ActivityIndicator,View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from "../../components/shop/OrderItem";
import * as orderActions from '../../store/actions/orders';
import Colors from "../../constants/Colors";

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(orderActions.setProduct()).then(res => {
            setIsLoading(false);

        }).catch(err => {
            setIsLoading(false);
            setError(true);
        });
    }, []);

    const orders = useSelector(state => state.orders.orders);

    if(error) {
        return (
            <View style={styles.loader}>
                <Text>{error}</Text>
                <Button title="Try again" onPress={() => {
                    dispatch(orderActions.setProduct()).then(res => {
                        setIsLoading(false);
            
                    }).catch(err => {
                        setIsLoading(false);
                        setError(true);
                    });
                }}/>
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
    if (!isLoading && orders.length == 0) {
        return (
            <View style={styles.loader}>
                <Text>There is no order to show!</Text>
            </View>
        );
    }

    return (
        <FlatList 
            data={orders} 
            keyExtractor={item => item.id} 
            renderItem={itemData => <OrderItem 
                                        amount={itemData.item.totalAmount} 
                                        date={itemData.item.readableDate}
                                        items={itemData.item.items}
                                    />
            }
        />
    );
}

OrdersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title='Menu' 
                    iconName='ios-menu'
                    onPress={() => {navData.navigation.toggleDrawer();}}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize:18
    },
    container:{
        flex:1
    },
    loader: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default OrdersScreen