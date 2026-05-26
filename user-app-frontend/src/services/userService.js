import axios from "axios";

const API_URL = "https://dummyjson.com/users";

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data.users;
};