import { Handler } from "express";

export const getTabs: Handler = async () => {
  // const queryParams = req.query;

  // const db = new PostgreSQL();

  // const candidateId = (isNaN(Number(queryParams.id)) === false) ? Number(queryParams.id) : null;
  // const candidateType = (queryParams.type) ? String(queryParams.type) : null;
  // const candidateLabel = (queryParams.label) ? String(queryParams.label) : null;
  // const candidateValue = (queryParams.value) ? String(queryParams.value) : null;

  // const connection = await db.getConnection();

  // const data = await connection
  //   .selectFrom(tTabs)
  //   .where(tTabs.id.equalsIfValue(candidateId))
  //   .and(tTabs.type.equalsIfValue(candidateType))
  //   .and(tTabs.label.equalsIfValue(candidateLabel))
  //   .and(tTabs.value.equalsIfValue(candidateValue))
  //   .select({
  //     id: tTabs.id,
  //     label: tTabs.label,
  //     value: tTabs.value,
  //     type: tTabs.type
  //   })
  //   .executeSelectMany();

  // const response: IResponse = (data.length !== 0)
  //   ? createResponse({
  //     status: 200,
  //     ok: true,
  //     data
  //   })
  //   : createResponse({
  //     status: 404,
  //     ok: false,
  //     message: "Not found!"
  //   });

  // res.json(response);
};

export const insertTab: Handler = async () => {
  // const body = req.body;

  // if(!isValidTabBody(body)) {
  //   res.status(400).json(createResponse({
  //     status: 400,
  //     ok: false,
  //     message: "Invalid data!"
  //   }));

  //   return;
  // }

  // const tabValue = serializeTabLabel(body.label);

  // const connection = await new PostgreSQL().getConnection();
  // const insertedId = await connection
  //   .insertInto(tTabs)
  //   .set({
  //     label: String(body.label),
  //     value: tabValue,
  //     type: String(body.type)
  //   })
  //   .onConflictDoNothing()
  //   .returning({id: tTabs.id})
  //   .executeInsertNoneOrOne();

  // Boolean(insertedId) === false
  // ? res.status(409).json(createResponse({
  //     status: 409,
  //     ok: false,
  //     message: "A tab with given name already exists!"
  //   }))
  // : res.status(201).json(createResponse({
  //     status: 201,
  //     ok: true
  //   }));
};

export const updateTab: Handler = async () => {
  // const body = req.body;

  // const connection = await new PostgreSQL().getConnection();

  // if(!body.id || !await tabExists(connection, {id: body.id})) {
  //   res.status(404).json(createResponse({
  //     status: 404,
  //     ok: false,
  //     message: "No tab found!"
  //   }));

  //   return;
  // }

  // const tabValue = (body.label)
  //   ? serializeTabLabel(body.label)
  //   : null;

  //   await connection
  //   .update(tTabs)
  //   .setIfValue({
  //     label: body.label,
  //     value: tabValue,
  //     type: body.type
  //   })
  //   .where(tTabs.id.equals(Number(body.id)))
  //   .executeUpdate();

  // res.json(createResponse({
  //   status: 200,
  //   ok: true
  // }));
};

// type PropsType = {
//   id?: number,
//   label?: string,
//   value?: string,
//   type?: string
// }
// const tabExists = async (connection: PostgresConnection, props: PropsType): Promise<boolean> => {
//   const candidateLabel = (props.label) ? String(props.label) : null;
//   const candidateValue = (props.value) ? String(props.value) : null;
//   const candidateType = (props.type) ? String(props.type) : null;

//   return (await connection
//     .selectFrom(tTabs)
//     .where(tTabs.id.equalsIfValue(props.id))
//     .and(tTabs.label.containsIfValue(candidateLabel))
//     .and(tTabs.value.containsIfValue(candidateValue))
//     .and(tTabs.type.containsIfValue(candidateType))
//     .select({id: tTabs.id})
//     .executeSelectMany()).length !== 0;
// };
