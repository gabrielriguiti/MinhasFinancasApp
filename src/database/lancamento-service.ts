import { enablePromise, SQLiteDatabase } from "react-native-sqlite-storage";

import { Lancamento } from "../model/types/Lancamento";
import { Provisao } from "../model/types/Provisao";

enablePromise(true);

const tableName = "LANCAMENTOS";

export const createLancamento = async (db: SQLiteDatabase, lancamento: Lancamento) => {
  const insertQuery =
    `INSERT INTO ${tableName}(ID, DATA, CATEGORIA, VALOR, RECDESP)` +
    `VALUES ((SELECT IFNULL(MAX(ID), 0) + 1 FROM ${tableName}), ${lancamento.data.getTime()}, ${lancamento.categoria}, ${lancamento.valor}, ${lancamento.recDesp})`;

  return db.executeSql(insertQuery);
};

export const createLancamentoFixo = async (db: SQLiteDatabase, lancamento: Provisao) => {
  const insertQuery =
    `INSERT INTO ${tableName}(ID, DIAVENC, VALOR, DESCRICAO, CATEGORIA, RECDESP)` +
    `VALUES ((SELECT IFNULL(MAX(ID), 0) + 1 FROM ${tableName}), ${lancamento.diaVenc}, ${lancamento.valor}, '${lancamento.descricao}', ${lancamento.categoria}, ${lancamento.recDesp})`;

  return db.executeSql(insertQuery);
};

export const findLancamentos = async (db: SQLiteDatabase): Promise<Provisao[]> => {
  try {
    // ID INTEGER PRIMARY KEY, DATA DATE, CATEGORIA INTEGER, VALOR FLOAT, DESCRICAO TEXT, DIAVENC NUMBER
    const lancamentos: Provisao[] = [];
    const results = await db.executeSql(`SELECT ID AS id, DATA AS data, CATEGORIA AS categoria, VALOR AS valor, DESCRICAO AS descricao, DIAVENC AS diaVenc, RECDESP AS recDesp FROM ${tableName} WHERE DIAVENC IS NULL`);

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        lancamentos.push(result.rows.item(index));
      }
    });

    return lancamentos;
  } catch (error) {
    console.error(error);
    throw Error("Erro ao consultar lançamentos.");
  }
};

export const findLancamentosFixos = async (db: SQLiteDatabase): Promise<Provisao[]> => {
  try {
    // ID INTEGER PRIMARY KEY, DATA DATE, CATEGORIA INTEGER, VALOR FLOAT, DESCRICAO TEXT, DIAVENC NUMBER
    const lancamentos: Provisao[] = [];
    const results = await db.executeSql(`SELECT ID AS id, DATA AS data, CATEGORIA AS categoria, VALOR AS valor, DESCRICAO AS descricao, DIAVENC AS diaVenc, RECDESP AS recDesp FROM ${tableName} WHERE DIAVENC IS NOT NULL`);

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        lancamentos.push(result.rows.item(index));
      }
    });

    return lancamentos;
  } catch (error) {
    console.error(error);
    throw Error("Erro ao consultar lançamentos.");
  }
};

