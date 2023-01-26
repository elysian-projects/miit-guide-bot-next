import { Handler } from "express";

type Controller = {[key in string]: Handler}

export const userController: Controller = {
  getUser: async (req, res) => {
    console.log(req);

    res.send({
      status: 200,
      ok: true
    });
  }
};
