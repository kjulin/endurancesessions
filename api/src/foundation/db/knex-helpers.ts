import { Knex } from "knex";
import { z } from "zod";

export const QueryOptions = z.object({
  offset: z.number().optional(),
  limit: z.number().optional(),
  order: z.string().optional()
});
export type QueryOptions = z.infer<typeof QueryOptions>;

export const addWhereClauses = (query: Knex.QueryBuilder, fields: any): Knex.QueryBuilder => {
  return Object.keys(fields).reduce((query, key) => {
    const value = fields[key];

    if (value !== undefined && value instanceof Array) {
      return query.whereIn(key, value);
    } else if (value !== undefined) {
      return query.where(key, value);
    } else {
      return query;
    }
  }, query);
};

export const addOptions = (query: Knex.QueryBuilder, options: QueryOptions): Knex.QueryBuilder => {
  if (options.offset) {
    query.offset(options.offset);
  }

  if (options.limit) {
    query.limit(options.limit);
  }

  if (options.order) {
    query.orderByRaw(options.order);
  }

  return query;
};

export const buildQuery = (
  query: Knex.QueryBuilder,
  fields: any,
  options?: QueryOptions
): Knex.QueryBuilder => {
  const queryWithWhere = addWhereClauses(query, fields);

  if (!options) return queryWithWhere;
  return addOptions(queryWithWhere, options);
};
