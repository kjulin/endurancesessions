import * as fs from "fs";
import {Knex} from "knex";

export class SqlMigrationSource {

    constructor(private migrationDir: string) {}

    async getMigrations(): Promise<string[]> {
        const files = this.readFilesRecursive(this.migrationDir);
        return files.filter(f => f.endsWith(".sql")).sort();
    }

    getMigrationName(migration: string) {
        return migration.split(".")[0];
    }

    async getMigration(migration: string): Promise<any> {
        const sql = fs.readFileSync(migration, "utf-8");
        return {
            up: async (knex: Knex) => knex.raw(sql),
            down: () => {}
        }
    }

    private readFilesRecursive = (dir: string): string[] => {
        const dirListing = fs.readdirSync(dir);
        const files = dirListing.filter(f => f.endsWith(".sql")).map(f => `${dir}/${f}`);

        for (const entry of dirListing) {
            if (fs.statSync(`${dir}/${entry}`).isDirectory()) {
                files.push(...this.readFilesRecursive(`${dir}/${entry}`));
            }
        }
        return files;
    }
}

