import { isValidImage } from "@/adapters/images";
import { GREETINGS } from "@/constants/messages";
import { Image } from "@/types/lib";
import { getApiURL } from "@/utils/server";
import axios from "axios";
import { IResponse } from "common/dist";

export const getIntroData = async () => {
  const articleTabs = await axios.get<IResponse<Image[]>>(`${getApiURL()}/tabs?type=article`)
    .then(response => {
      return isValidImage(response.data.data)
        ? response.data.data
        : [];
    })
    .catch(() => {
      return [];
    });

  return {
    message: GREETINGS,
    tabs: articleTabs
  };
};
