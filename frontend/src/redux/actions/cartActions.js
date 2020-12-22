import axios from 'axios';
import {
  CART_REMOVE_ITEM,
  CART_ADD_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

// Add to Cart
//getState gives the entire state tree =>  for local storage
export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        id: data.product._id,
        name: data.product.name,
        image: data.product.image,
        price: data.product.price,
        countInStock: data.product.countInStock,
        qty: qty,
      },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (err) {
    // dispatch({
    //   type: PRODUCT_DETAILS_FAIL,
    //   payload:
    //     err.response && err.response.data.message
    //       ? err.response.data.message
    //       : err.message,
    // });
  }
};

// Remove From Cart
export const removeFromCart = (id) => async (dispatch, getState) => {
  // const { data } = await axios.get(`/api/v1/products/${id}`);
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Save Shipping From Cart
export const saveShippingAddress = (data) => async (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

// Save Payment details
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
