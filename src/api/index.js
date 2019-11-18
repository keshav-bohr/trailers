import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://in.bookmyshow.com/serv",
  withCredentials: false
});

export default axiosInstance;
