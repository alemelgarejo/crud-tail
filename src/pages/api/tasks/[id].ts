import type { NextApiResponse, NextApiRequest } from "next";
import { conn } from "../../../utils/database";

export default async function tasks(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      try {
        const data = "SELECT * FROM tasks WHERE id = $1";
        const values = [query.id]
        const response = await conn.query(data, values);
        if (response.rows.length === 0) {
          return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json(response.rows);
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    case "PUT":
      try {
        const { title, description } = body;
        const data =
          "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *";
        const values = [title, description, query.id];
        const response = await conn.query(data, values);
        if (response.rows.length === 0) {
          return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json(response.rows[0]);
      } catch (error: any) {
        return res.status(404).json({ error: error.message });
      }
    case "DELETE":
      try {
        const data = "DELETE FROM tasks WHERE id = $1 RETURNING *";
        const values = [query.id]
        const response = await conn.query(data, values);
        if (response.rows.length === 0) {
          return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json(response.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    default:
      res.status(400).json("invalid method");
      break;
  }
}
