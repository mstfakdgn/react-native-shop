import React from "react";
import { View, Text, FlatList, Button, StyleSheet, TextInput} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import Card from "../../components/UI/Card";

const CartScreen = props => {

    const dispatch = useDispatch();

    const removeItemFromList = productId => {
        dispatch(cartActions.removeFromCart(productId))
    }


    const renderProduct = itemData => {
        return (
            <CartItem
                productId={itemData.item.productId} 
                title={itemData.item.productTitle}
                quantity={itemData.item.quantity}
                amount={itemData.item.sum}
                onRemove={removeItemFromList}
                deletable={true}
            />
        );
    }

    const totalAmount = useSelector(state => state.cart.totalAmount);

    const cardItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            })
        }
        return transformedCartItems.sort((a,b) => a.productId > b.productId ? 1 : -1);
    });

    const completeOrder = () => {
        dispatch(orderActions.addOrder(cardItems,totalAmount))
        props.navigation.navigate('products');
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: 
                    <Text style={styles.amount}>${Math.round(totalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                <Button 
                    color={Colors.accent} 
                    title="Order Now" 
                    disabled={cardItems.length === 0 ? true : false}
                    onPress={completeOrder}
                />
            </Card>
            <View>
                <FlatList 
                    data={cardItems} 
                    keyExtractor={item => item.productId} 
                    renderItem={renderProduct}
                    onRemove={removeItemFromList}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        margin:20
    },
    summary: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom: 20,
        padding: 20,
    },
    summaryText: {
        fontFamily:'open-sans-bold',
        fontSize:18
    },
    amount: {
        color: Colors.primary
    }
});

export default CartScreen;