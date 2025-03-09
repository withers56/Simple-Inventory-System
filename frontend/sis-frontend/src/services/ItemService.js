/* eslint-disable no-unused-vars */
import axios from "axios";
import { REST_API_BASE_URL_ITEMS } from "../KEYS"
import { getHeaders } from "../auth/auth";



export const listItems = () => axios.get(REST_API_BASE_URL_ITEMS, {headers: getHeaders()});

export const createItem = (item) => axios.post(REST_API_BASE_URL_ITEMS + '/create', item, {headers: getHeaders()});

export const getItem = (itemId) => axios.get(REST_API_BASE_URL_ITEMS + '/' + itemId, {headers: getHeaders()});

export const updateItem = (itemId, item) => axios.put(REST_API_BASE_URL_ITEMS + '/' + itemId, item, {headers: getHeaders()});

export const deleteItem = (itemId) => axios.delete(REST_API_BASE_URL_ITEMS + '/' + itemId, {headers: getHeaders()});
