/* eslint-disable no-unused-vars */
import axios from "axios";
import { REST_API_BASE_URL_INVENTORY } from "../KEYS"

export const listInventories = () => axios.get(REST_API_BASE_URL_INVENTORY);

export const getInventory = (id) => axios.get(REST_API_BASE_URL_INVENTORY + '/' + id);

export const createItemAndInventory = (inventory) => axios.post(REST_API_BASE_URL_INVENTORY + '/createItemAndInventory', inventory);

export const updateInventory = (id, inventory) => axios.put(REST_API_BASE_URL_INVENTORY + '/' + id, inventory);

export const updateInventoryQuantity = (quantity, id) => axios.put(REST_API_BASE_URL_INVENTORY + '/quantity/' + id + '?quantity=' + quantity);