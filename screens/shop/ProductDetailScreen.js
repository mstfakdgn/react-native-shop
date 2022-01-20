import React from "react";
import { View, Text, Image, StyleSheet, Button, ScrollView} from 'react-native';
import  Colors  from "../../constants/Colors";
import { useSelector,useDispatch } from "react-redux";
import * as cartActions from '../../store/actions/cart';


const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');

    const dispatch = useDispatch();

    const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id === productId));
    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.card}>
                <View style={styles.actions}>
                    <Button color={Colors.primary} title="Add to Cart" onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct))
                    }}></Button>
                </View>
                <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
                <Text style={styles.description}>{selectedProduct.description}</Text>
            </View>
        </ScrollView>
    );
}

ProductDetailScreen.navigationOptions = (navData)=> {
    return {
        headerTitle:navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize:20,
        color: '#888',
        textAlign:'center',
        marginVertical:20,
        fontFamily:'open-sans-bold'
    },
    description: {
        fontSize:14,
        textAlign:'center',
        marginHorizontal:10,
        fontFamily:'open-sans'
    },
    actions: {
        marginVertical:10,
        alignItems:'center'
    },
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.36,
        shadowOffset: {width:0, height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        height: 300,
        margin: 20,
        overflow: 'hidden',
        marginTop:-20
    }
})

export default ProductDetailScreen;