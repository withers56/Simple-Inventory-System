/* eslint-disable no-unused-vars */
import axios from "axios";
import { REST_API_BASE_URL } from "../config/KEYS";



export const listItems = () => axios.get(REST_API_BASE_URL);

export const createItem = (item) => axios.post(REST_API_BASE_URL + '/create', item);

export const getItem = (itemId) => axios.get(REST_API_BASE_URL + '/' + itemId);

export const updateItem = (itemId, item) => axios.put(REST_API_BASE_URL + '/' + itemId, item);

export const deleteItem = (itemId) => axios.delete(REST_API_BASE_URL + '/' + itemId);
