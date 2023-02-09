import axios from "axios";
import { IResponse } from "../../../common/src";
import { getServerURL } from "../../../common/src/api/utils";

export const loginUser = async (login: string, password: string): Promise<IResponse<{token: string}>> => {
  const query = getServerURL().concat("/api/auth/login");

  return await axios.post(query, {
    login,
    password
  });
}

export const logoutUser = async () => {}
