import { Handler } from "express";

export const getUser: Handler = async (_, res) => {
  res.send({
    status: 200,
    ok: true
  });
};
