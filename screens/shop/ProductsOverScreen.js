import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet,FlatList,Platform, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const ProductsOverScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        setError(null)
        setIsLoading(true);
        dispatch(productActions.setProduct()).then(res => {
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            setError(err.message);
        });
    },[dispatch]);

    //drawer change fetch new ıtems
    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', () => {
            setError(null)
            setIsLoading(true);
            dispatch(productActions.setProduct()).then(res => {
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
                setError(err.message);
            });
        })

        return () => {
            willFocusSub.remove();
        }
    }, []);

    const renderProduct = itemData => {
        return (
            <ProductItem 
                title={itemData.item.title}
                imageUrl={itemData.item.imageUrl}
                price={itemData.item.price}
                onSelect= {() => {
                    props.navigation.navigate('productDetail', { productId: itemData.item.id, productTitle:itemData.item.title})
                }}
                // onSelect={ () => {
                //     props.navigation.navigate('productDetail', { productId: itemData.item.id, productTitle:itemData.item.title})
                // }}
                // onAddToCart={() => {
                //     dispatch(cartActions.addToCart(itemData.item))
                // }}
            >
                <Button
                    title="View Details" 
                    onPress={() => {
                        props.navigation.navigate('productDetail', { productId: itemData.item.id, productTitle:itemData.item.title})
                    }} 
                    color={Colors.primary}>    
                </Button>
                <Button 
                    title="To Cart" 
                    onPress={() => {
                        dispatch(cartActions.addToCart(itemData.item))
                    }} 
                    color={Colors.primary}>                
                </Button>
            </ProductItem>
        );
    }

    const products = useSelector(state => state.products.availableProducts);
    
    if(error) {
        return (
            <View style={styles.loader}>
                <Text>{error}</Text>
                <Button title="Try again" onPress={() => {
                    dispatch(productActions.setProduct()).then(res => {
                        setIsLoading(false);
                    }).catch(err => {
                        setIsLoading(false);
                        setError(err.message);
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
    if (!isLoading && products.length == 0) {
        return (
            <View style={styles.loader}>
                <Text>There is no product to show!</Text>
            </View>
        );
    }
    return <FlatList
                onRefresh={() => {

                    dispatch(productActions.setProduct()).then(res => {
                        setIsLoading(false);
                    }).catch(err => {
                        setIsLoading(false);
                        setError(err.message);
                    });
                }}
                refreshing={isLoading} 
                data={products} 
                keyExtractor={item => item.id} 
                renderItem={renderProduct}
            />
    
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
});

ProductsOverScreen.navigationOptions =  navData => {
    return {
        headerTitle: 'Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title='Menu' 
                    iconName='ios-menu'
                    onPress={() => {navData.navigation.toggleDrawer();}}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title='Cart' 
                    iconName= {Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    color= {Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPress={ () => {
                        navData.navigation.navigate('cart')
                    }}
                />
            </HeaderButtons>
        )
    }
}

export default ProductsOverScreen;