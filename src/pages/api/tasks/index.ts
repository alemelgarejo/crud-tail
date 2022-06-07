import type { NextApiResponse, NextApiRequest } from "next";
import { conn } from "../../../utils/database";

export default async function tasks(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM tasks";
        const response = await conn.query(query);
        return res.status(200).json(response.rows);
      } catch (error: any) {return res.status(500).json({error: error.message});}
    case "POST":
      try {
        const {title, description} = body
        const query = "INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *";
        const values = [title, description]
        const response = await conn.query(query, values);
        return res.status(200).json(response.rows[0]);
      } catch (error: any) {return res.status(404).json({error: error.message});}
    default:
      res.status(400).json('invalid method')
      break;
  }
}
