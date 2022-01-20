import React from 'react';
import { FlatList,Button,Alert, StyleSheet,View,Text } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const deletehandler = (prodId) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?',[
            {text:'No', style:'default'},
            {text:'yes', style:'destructive', onPress: () => {
                dispatch(productActions.deleteProduct(prodId)).then(res => {

                }).catch(err => {
                    Alert.alert('somethin went wrong', err.message);
                })
            }}
        ]);
    }

    const renderProduct = itemData => {
        return (
            <ProductItem 
                title={itemData.item.title}
                imageUrl={itemData.item.imageUrl}
                price={itemData.item.price}
                onSelect= {() => {
                    props.navigation.navigate('productDetail', { productId: itemData.item.id, productTitle:itemData.item.title})
                }}
            >
                <Button 
                    title="Edit" 
                    onPress={() => { props.navigation.navigate('editProduct', {productId: itemData.item.id})}} 
                    color={Colors.primary}>    
                </Button>
                <Button 
                    title="Delete" 
                    onPress={() => {deletehandler(itemData.item.id)}} 
                    color={Colors.primary}>                
                </Button>
            </ProductItem>
        );
    }
    
    if (userProducts.length == 0) {
        return (
            <View style={styles.loader}>
                <Text>There is no order to show!</Text>
            </View>
        );
    }

    return (
        <FlatList 
            data={userProducts} 
            keyExtractor={item => item.id} 
            renderItem={renderProduct}
        />
    );
}

UserProductsScreen.navigationOptions =  navData => {
    return {
        headerTitle: 'User Products',
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
                    title='Add Product' 
                    iconName= {Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    color= {Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPress={ () => {
                        navData.navigation.navigate('editProduct')
                    }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
});
export default UserProductsScreen;