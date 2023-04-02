import { GREETINGS } from "@/constants/messages";
import { Image } from "@/types/lib";
import { getData } from "common/dist";

export const getIntroData = async () => {
  const response = await getData("tabs", {where: {type: "article"}});

  if(response.ok && response.data) {
    return {
      message: GREETINGS,
      tabs: response.data as Image[]
    };
  }

  throw new Error("К сожалению, в данном разделе ничего не найдено!");
};
