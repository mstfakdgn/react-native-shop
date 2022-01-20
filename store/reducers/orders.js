import Order from "../../models/order"
import { ADD_ORDER, SET_ORDERS } from "../actions/orders";

const initialState = {
    orders: []
}

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                action.id, 
                action.orderData.items, 
                action.orderData.totalAmount,
                action.date
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        case SET_ORDERS:
            return {
                ...state,
                orders:action.orders
            }
    }
    return state
}

export default orderReducer;