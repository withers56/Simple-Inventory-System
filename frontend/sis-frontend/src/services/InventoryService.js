/* eslint-disable no-unused-vars */
import axios from "axios";
import { REST_API_BASE_URL_INVENTORY } from "../KEYS"
import { getHeaders } from "../auth/auth";

export const listInventories = () => axios.get(REST_API_BASE_URL_INVENTORY, {headers: getHeaders()});

export const getInventory = (id) => axios.get(REST_API_BASE_URL_INVENTORY + '/' + id, {headers: getHeaders()});

export const createItemAndInventory = (inventory) => axios.post(REST_API_BASE_URL_INVENTORY + '/createItemAndInventory', inventory, {headers: getHeaders()});

export const updateInventory = (id, inventory) => axios.put(REST_API_BASE_URL_INVENTORY + '/' + id, inventory, {headers: getHeaders()});

export const updateInventoryQuantity = (inventoryQuantity, id) => axios.put(REST_API_BASE_URL_INVENTORY + '/quantity/' + id, null, {headers: getHeaders(), params: {quantity: inventoryQuantity}});
