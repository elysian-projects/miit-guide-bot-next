import { createResponse } from "@/utils/response";
import { ErrorRequestHandler } from "express";

export const invalidSyntaxError: ErrorRequestHandler = (err, _, res, next) => {
  if(err instanceof SyntaxError && "body" in err) {
    console.error(err);

    res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: err.message
    }));

    return;
  }

  next();
};
