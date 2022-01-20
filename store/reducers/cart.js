import { ADD_TO_CART } from "../actions/cart"
import { REMOVE_FROM_CART } from "../actions/cart"
import { ADD_ORDER } from "../actions/orders"
import CardItem from '../../models/cart-item';
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    items: {},
    totalAmount:0
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const addedproduct = action.product;
            const prodPrice = action.product.price;
            const prodTitle = action.product.title;
            
            let updatedOrNewCartItem;

            if (state.items[addedproduct.id]) {
                //already have product on cart
                updatedOrNewCartItem = new CardItem(
                    state.items[addedproduct.id].quantity+1,
                    prodPrice,
                    prodTitle,
                    state.items[addedproduct.id].sum+prodPrice
                );
                // return {
                //     ...state,
                //     items: {...state, [addedproduct.id]: updatedCartItem},
                //     totalAmount: state.totalAmount + prodPrice
                // }
            } else {
                updatedOrNewCartItem = new CardItem(1,prodPrice, prodTitle, prodPrice);
                // return {
                //     ...state,
                //     items: { ...state.items, [addedproduct.id]: newCartItem},
                //     totalAmount: state.totalAmount+prodPrice
                // }
            }
            return {
                ...state,
                items: { ...state.items, [addedproduct.id]: updatedOrNewCartItem},
                totalAmount: state.totalAmount + updatedOrNewCartItem.productPrice
            }
        case REMOVE_FROM_CART:
            const selectedItem = state.items[action.pid];
            let updatedCartItems;
            if (selectedItem.quantity > 1) {
                const updatedOrNewCartItem = new CardItem(
                    selectedItem.quantity - 1,
                    selectedItem.productPrice,
                    selectedItem.productTitle,
                    state.items[action.pid].sum - selectedItem.productPrice
                );

                updatedCartItems = { ...state.items, [action.pid] : updatedOrNewCartItem}
            } else if (selectedItem.quantity == 1) {
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.pid];
            }
            return {
                ...state,
                items:updatedCartItems,
                totalAmount: state.totalAmount - selectedItem.productPrice
            }
        case ADD_ORDER:
            return initialState
        case DELETE_PRODUCT:
            if (!state.items[action.pid]) {
                return state;
            }
            const updatedItems = {...state.items};
            const itemTotal = state.items[action.pid].sum;
            delete updatedItems[action.pid]
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
    }
    return state
}

export default cartReducer