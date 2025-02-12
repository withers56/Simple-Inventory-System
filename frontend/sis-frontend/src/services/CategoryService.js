/* eslint-disable no-unused-vars */
import axios from "axios";
import { REST_API_BASE_URL_CATEGORY } from "../KEYS";

export const listCategories = () => axios.get(REST_API_BASE_URL_CATEGORY);