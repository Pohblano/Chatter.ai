import axios from "axios"

const api = axios.create({
  withCredentials: false,
  baseURL: process.env.REACT_APP_IS_PRODUCTION === "yes" ? "http://chatterai.pythonanywhere.com/api" : "http://127.0.0.1:5000/api",
  // baseURL:"http://127.0.0.1:5000/api",
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods':'*',
    'Access-Control-Allow-Credentials': 'true',
    'accept': 'application/json',
    'content-type': 'application/json',
   },
});

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error)
  }

  return Promise.reject(error)
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error)
});

export default api;
