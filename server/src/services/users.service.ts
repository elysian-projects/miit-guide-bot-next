// This api must be needed when creating an new/validating existing users to access
// the GUI for interaction with the content. This must NOT be used anywhere else
// as we don't want new users to be created from the GUI page, it's not safe

import { Handler } from "express";

export const getUser: Handler = async (_, res) => {
  res.send({
    status: 200,
    ok: true
  });
};
