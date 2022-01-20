import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const addOrder = (cartItems, totalAmount) => {

    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        // async code
        const date = new Date();
        const response = await fetch(`https://react-native-shop-27254-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cartItems, totalAmount: totalAmount, date: date
            })
        });

        const resData = await response.json();

        dispatch({
            type:ADD_ORDER,
            orderData: {id:resData.name  ,items: cartItems, totalAmount: totalAmount, date:date}
        });
    }
}

export const setProduct = () => {

    return async (dispatch, getState) => {
        try {
            const userId = getState().auth.userId;
            const response = await fetch(`https://react-native-shop-27254-default-rtdb.firebaseio.com/orders/${userId}.json`, {
                method:'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Upps');
            }

            const resData = await response.json();
            console.log(resData);
            let loadedOrders = [];
    
            for (const key in resData) {
                console.log(resData[key]);
                loadedOrders.push(new Order(
                    key,
                    resData[key].items, 
                    resData[key].totalAmount, 
                    resData[key].date, 
                ));
            }


            dispatch({
                type:SET_ORDERS,
                orders: loadedOrders
            })
        }catch (err) {
            throw err
        }

    }
        
}