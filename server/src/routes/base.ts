import { Handler } from "express";

export const index: Handler = (_, res) => {
  res.json({
    status: 200,
    message: "Server is active :)",
    ok: true
  });
};

export const notFound: Handler = (_, res) => {
  res.status(404).json({
    status: 404,
    message: "Not found",
    ok: false
  });
};
