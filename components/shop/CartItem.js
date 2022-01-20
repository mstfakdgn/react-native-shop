import React from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import  Colors  from "../../constants/Colors";
import { Ionicons } from '@expo/vector-icons';

const CartItem = props => {
    let TouchableComponent =TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >=21) {
        TouchableComponent= TouchableNativeFeedback;
    }

    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.amount.toFixed(2)}  </Text>
                {props.deletable && <TouchableComponent onPress={() => props.onRemove(props.productId)} style={styles.deleteButton}>
                    <Ionicons 
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} 
                        size={23} 
                        color="red"
                    />
                </TouchableComponent>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent: 'space-between',
        marginHorizontal:20,
    },
    itemData: {
        flexDirection:'row',
        alignItems:'center',
    },
    quantity: {
        fontFamily:'open-sans',
        color:'#888',
        fontSize: 16
    },
    mainText: {
        fontFamily:'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft:20
    }
})

export default CartItem;