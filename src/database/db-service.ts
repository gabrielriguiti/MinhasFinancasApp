import { enablePromise, openDatabase } from "react-native-sqlite-storage";

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: "financas.db", location: "default" });
};

export const createTables = async () => {
  const db = await getDBConnection();

  await db.executeSql(tableLancamentos);
};

  const tableLancamentos = "CREATE TABLE IF NOT EXISTS LANCAMENTOS (ID INTEGER PRIMARY KEY, DATA DATE, CATEGORIA INTEGER, VALOR FLOAT, DESCRICAO TEXT, DIAVENC NUMBER, RECDESP INTEGER)";

//
// export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
//   const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
//   await db.executeSql(deleteQuery);
// };
//
// export const deleteTable = async (db: SQLiteDatabase) => {
//   const query = `drop table ${tableName}`;
//
//   await db.executeSql(query);
// };
