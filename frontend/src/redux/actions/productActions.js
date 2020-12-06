import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';
import axios from 'axios';

// action creators
// fetch LIST Products
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/v1/products');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.data.products.data });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

// fetch Product Details
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.data.product });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
