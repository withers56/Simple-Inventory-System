/* eslint-disable no-unused-vars */
import axios from "axios";
import { REST_API_BASE_URL_AUTH } from "../KEYS";
import { getHeaders } from "../auth/auth";

export const userLogin = (userLoginCred) => axios.post(REST_API_BASE_URL_AUTH + '/auth', userLoginCred, getHeaders());