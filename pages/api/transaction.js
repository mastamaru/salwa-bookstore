// pages/api/transactions.js
import { transact } from "./db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const result = await transact(async (client) => {
        return await client.query("SELECT * FROM TABEL.transaction");
      });
      return res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { transaction_id } = req.body; // Mendapatkan transactionId dari body request

      await transact(async (client) => {
        // Melakukan DELETE berdasarkan transactionId yang diberikan
        await client.query(
          "DELETE FROM TABEL.transaction WHERE transaction_id = $1",
          [transaction_id]
        );
      });

      return res.status(204).end(); // Respons sukses tanpa konten
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
