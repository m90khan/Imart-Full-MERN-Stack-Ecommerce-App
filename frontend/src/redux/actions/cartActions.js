import axios from 'axios';
import { CART_REMOVE_ITEM, CART_ADD_ITEM } from '../constants/cartConstants';

// Add to Cart
//getState gives the entire state tree =>  for local storage
export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data.data.product._id,
        name: data.data.product.name,
        image: data.data.product.image,
        price: data.data.product.price,
        countInStock: data.data.product.countInStock,
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
  try {
    // const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
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
