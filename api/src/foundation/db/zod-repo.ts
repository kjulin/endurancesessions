import { Knex } from "knex";
import { z } from "zod";
import {buildQuery, QueryOptions} from "./knex-helpers";
import {DB} from "../../db";

export type Arrayable<T> = {
  [P in keyof T]: T[P] | T[P][] | null | undefined;
};

export type ZodRepoConfig = {
  tableName: string;
  idField?: string;
  entitySchema: z.ZodType<any>;
  createSchema?: z.ZodType<any>;
  updateSchema?: z.ZodType<any>;
};

export abstract class ZodRepo<DBRecordType extends {[i: string]: any}> {
  public abstract config: ZodRepoConfig;

  protected ctx = (trx?: Knex.Transaction) => {
    return (trx ?? DB)(this.config.tableName);
  };

  list = async (
    fields: Arrayable<Partial<DBRecordType>>,
    options?: QueryOptions,
    trx?: Knex.Transaction
  ): Promise<DBRecordType[]> => {
    let query = this.ctx(trx).select();
    const result = await buildQuery(query, fields, options);

    return this.config.entitySchema.array().parse(result);
  };

  find = async (
      fields: Arrayable<Partial<DBRecordType>>,
      trx?: Knex.Transaction
  ): Promise<DBRecordType> => {
    const entry = await this.findSafe(fields, trx);
    if (!entry) throw new Error("No such entry");
    return entry;
  };

  findSafe = async (fields: Arrayable<Partial<DBRecordType>>, trx?: Knex.Transaction): Promise<DBRecordType | null> => {
    const query = this.addWhere(this.ctx(trx), fields);
    const entry = await query.first();
    if (!entry) return null;
    return this.config.entitySchema.parse(entry);
  };

  findById = async (id: string, trx?: Knex.Transaction): Promise<DBRecordType> => {
    if (!this.config.idField) throw new Error("Find by ID not supported without id field");
    if (id === undefined || id === null) throw new Error("ID required");

    // @ts-ignore
    return this.find({[this.config.idField]: id}, trx);
  }

  update = async (
    fields: Arrayable<Partial<DBRecordType>>,
    updates: Partial<DBRecordType>,
    trx?: Knex.Transaction
  ): Promise<any> => {
    if (!this.config.updateSchema) throw new Error("No update schema");

    this.config.updateSchema.parse(fields);
    const query = this.addWhere(this.ctx(trx), fields);
    return query.update(updates);
  };

  updateById = async (
      id: string,
      updates: Partial<DBRecordType>,
      trx?: Knex.Transaction
  ): Promise<any> => {
    if (!this.config.idField) throw new Error("Update by ID not supported without id field");
    if (id === undefined || id === null) throw new Error("ID required");

    //@ts-ignore
    return this.update({[this.config.idField]: id }, updates, trx);
  };

  create = async (data: any, trx?: Knex.Transaction): Promise<DBRecordType> => {
    if (!this.config.createSchema) throw new Error("No create schema");

    const entry = this.config.createSchema.parse(data);
    const result = await this.ctx(trx).insert(entry).returning("*");
    return this.config.entitySchema.parse(result[0]);
  }

  deleteById = async (id: string, trx?: Knex.Transaction): Promise<any> => {
    if (!this.config.idField) throw new Error("Delete by ID not supported without id field");
    if (id === undefined || id === null) throw new Error("ID required");

    return this.ctx(trx).where(this.config.idField, id).delete();
  }


  private addWhere = (
    query: Knex.QueryBuilder,
    fields: Arrayable<Partial<{[i: string]: any}>>
  ): Knex.QueryBuilder => {
    return Object.keys(fields).reduce((query, key) => {
      const value = fields[key];
      if (value !== undefined && value instanceof Array) {
        return query.whereIn(`${this.config.tableName}.${key}`, value);
      } else if (value !== undefined) {
        return query.where(`${this.config.tableName}.${key}`, value);
      } else {
        return query;
      }
    }, query);
  };
}
