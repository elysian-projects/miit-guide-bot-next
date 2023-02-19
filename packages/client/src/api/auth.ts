import axios from "axios";
import { IResponse } from "common/dist";
import { getServerURL } from "common/dist/api/utils";

export const loginUser = async (login: string, password: string): Promise<IResponse<{token: string}>> => {
  const query = getServerURL().concat("/api/auth/login");

  return await axios.post(query, {
    login,
    password
  });
}

export const logoutUser = async () => {}
