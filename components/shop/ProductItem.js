import React from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import  Colors  from "../../constants/Colors";
import Card from "../UI/Card";

const ProductItem = props => {
    let TouchableComponent =TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >=21) {
        TouchableComponent= TouchableNativeFeedback;
    }
    return (
        <Card style={styles.product}>
            <TouchableComponent onPress={props.onSelect} useForeground>
                <View>
                    <Image style={styles.image} source={{uri:props.imageUrl}}/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                        {props.children}
                        {/* <Button title="View Details" onPress={props.onPressViewDetail} color={Colors.primary}></Button>
                        <Button title="To Cart" onPress={props.onAddToCart} color={Colors.primary}></Button> */}
                    </View>
                </View>
            </TouchableComponent>
        </Card>
    );
}

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '60%'
    },
    title: {
        fontSize:18,
        marginVertical:4,
        fontFamily:'open-sans'
    },
    titleContainer: {
        alignItems:'center',
        height: '15%',
    },
    price: {
        fontSize:14,
        color: '#888',
        marginTop:5,
        fontFamily:'open-sans-bold'

    },
    actions: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:20,
        height: '25%',
    }
})

export default ProductItem;