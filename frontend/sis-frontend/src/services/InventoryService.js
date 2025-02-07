/* eslint-disable no-unused-vars */
import axios from "axios";
import { REST_API_BASE_URL_INVENTORY } from "../KEYS"

export const createItemAndInventory = (inventory) => axios.post(REST_API_BASE_URL_INVENTORY + '/createItemAndInventory', inventory);