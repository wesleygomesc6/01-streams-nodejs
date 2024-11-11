import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutesPath } from "./utils/build-routes-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutesPath("/users"),
    handler: (req, res) => {
      const { filtro } = req.query;
      const users = database.select(
        "users",
        filtro
          ? {
              nome: filtro,
              email: filtro,
            }
          : null
      );
      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutesPath("/users"),
    handler: (req, res) => {
      const { nome, email } = req.body;
      const user = {
        id: randomUUID(),
        nome,
        email,
      };

      database.insert("users", user);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutesPath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("users", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutesPath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { nome, email } = req.body;

      database.update("users", id, {
        nome,
        email,
      });

      return res.writeHead(204).end();
    },
  },
];
