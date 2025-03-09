/* eslint-disable no-unused-vars */
import axios from "axios";
import { REST_API_BASE_URL_CATEGORY } from "../KEYS";
import { getHeaders } from "../auth/auth";

export const listCategories = () => axios.get(REST_API_BASE_URL_CATEGORY, {headers: getHeaders()});

export const createCategory = (category) => axios.post(REST_API_BASE_URL_CATEGORY + '/create', category, {headers: getHeaders()});

export const removeCategory = (id) => axios.delete(REST_API_BASE_URL_CATEGORY + '/' + id, {headers: getHeaders()});