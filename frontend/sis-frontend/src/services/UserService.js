import axios from "axios";
import { REST_API_BASE_URL_USER } from "../KEYS";

export const getUser = () => axios.get(REST_API_BASE_URL_USER, {withCredentials: true});