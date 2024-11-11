import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
const databasePath = new URL("db.json", import.meta.url);

export class Database {
  #database = {}; //que tipo de objeto é esse?

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, filtro) {
    let data = this.#database[table] ?? [];

    if (filtro) {
      data = data.filter((row) => {
        return Object.entries(filtro).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
    return data;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data };
      this.#persist();
    }
  }
}
