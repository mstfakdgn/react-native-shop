import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import { DELETE_PRODUCT,ADD_PRODUCT,EDIT_PRODUCT,SET_PRODUCT } from '../actions/products';


const initialState = {
    // availableProducts: [PRODUCTS],
    // userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
    availableProducts: [],
    userProducts: []
}

const productReducer = (state = initialState, action) => {

    switch(action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.pid),
                availableProducts: state.availableProducts.filter(product => product.id !== action.pid)
            }
        case ADD_PRODUCT:
            const newProd = new Product(action.prod.id, 
                action.prod.ownerId, 
                action.prod.title, 
                action.prod.imageUrl, 
                action.prod.description, 
                action.prod.price
            );

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProd),
                userProducts: state.userProducts.concat(newProd)
            }
        case EDIT_PRODUCT:
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid);
            const updatedProd = new Product(action.pid, 
                state.userProducts[productIndex].ownerId, 
                action.prod.title, 
                action.prod.imageUrl, 
                action.prod.description, 
                state.userProducts[productIndex].price
            );
            const updatedUserProducts = [...state.userProducts]
            updatedUserProducts[productIndex] = updatedProd;
            
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pid);
            const availableProducts = [...state.availableProducts]
            availableProducts[availableProductIndex] = updatedProd;
            
            return {
                ...state,
                userProducts: updatedUserProducts,
                availableProducts:availableProducts
            }
        case SET_PRODUCT:
            return {
                ...state,
                availableProducts:action.products,
                userProducts: action.userProducts
            }
    }
    return state
}

export default productReducer