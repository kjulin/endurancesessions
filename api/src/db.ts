import knex from "knex";
import {SqlMigrationSource} from "./foundation";

export const DatabaseUrl = process.env.DATABASE_URL

export const DB = knex({
  client: "pg",
  connection: DatabaseUrl,
  migrations: {
    migrationSource: new SqlMigrationSource("migrations"),
  }
});

export const migrateDB = async () => {
  const res = await DB.raw("select 'OK' as result");
  console.log("DB CHECK", res.rows[0].result);

  await DB.migrate.latest().then((res) => console.log("DB MIGRATED", res));
};
