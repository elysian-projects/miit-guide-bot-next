import { PostgreSQL } from "@/database/postgresql";
import { tTabs } from "@/database/tables";
import { Handler } from "express";

const index: Handler = function(_, res) {
  const db = new PostgreSQL();

  const response = db.getConnection().selectFrom(tTabs);

  res.send(JSON.stringify({
    status: 200,
    message: "Server is active :)",
    response,
    ok: true
  }));
};

const notFound: Handler = (_, res) => {
  res.status(404).send(JSON.stringify({
    status: 404,
    message: "Not found",
    ok: false
  }));
};

export default {
  index,
  notFound
};
