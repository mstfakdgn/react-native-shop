import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

export const deleteProduct = (productId) => {

    return async (dispatch, getState) => {
        const token = getState().auth.token;

        const response = await fetch(`https://react-native-shop-27254-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Upps');
        }

        const resData = await response.json();

        dispatch({
            type:DELETE_PRODUCT,
            pid: productId
        });
    }
}

export const setProduct = () => {

    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {

            const response = await fetch('https://react-native-shop-27254-default-rtdb.firebaseio.com/products.json', {
                method:'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Upps');
            }

            const resData = await response.json();
    
            let loadedProducts = [];
    
            for (const key in resData) {
                loadedProducts.push(new Product(
                    key, resData[key].ownerId, 
                    resData[key].title, 
                    resData[key].imageUrl, 
                    resData[key].description, 
                    resData[key].price
                ));
            }
            console.log(loadedProducts);
            console.log(userId);
            dispatch({
                type:SET_PRODUCT,
                products:loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId),
            })
        }catch (err) {
            throw err
        }

    }
        
}

export const addProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        // async code
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://react-native-shop-27254-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                description, 
                imageUrl, 
                price,
                ownerId:userId
            })
        });

        if (!response.ok) {
            const errResData = await response.json();
            const errorID = errResData.error; 
            throw new Error(errorID);
        }

        const resData = await response.json();

        dispatch({
            type:ADD_PRODUCT,
            prod: {
                id:resData.name,
                title, 
                description, 
                imageUrl, 
                price,
                ownerId:userId
            }
        });
    }
}

export const editProduct = (id,title, description, imageUrl) => {

    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://react-native-shop-27254-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                description, 
                imageUrl
            })
        });

        if (!response.ok) {
            const errResData = await response.json();
            const errorID = errResData.error; 
            throw new Error(errorID);
        }
        
        const resData = await response.json();
        console.log(resData);
        
        dispatch({
            type:EDIT_PRODUCT,
            pid:id,
            prod: {
                title, 
                description, 
                imageUrl
            }
        });
    } 
}