// pages/api/transactions.js
import { transact } from "./db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await transact(async (client) => {
        return await client.query(
          "SELECT * FROM TABEL.transaction ORDER BY transaction_id, book_id ASC"
        );
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
  } else if (req.method === "POST") {
    try {
      const {
        customer_id,
        book_id,
        quantity,
        transaction_date,
        price,
        staff_id,
      } = req.body; // Mendapatkan data dari body request

      await transact(async (client) => {
        // Melakukan INSERT dengan data yang diberikan
        await client.query(
          "INSERT INTO TABEL.transaction (customer_id, book_id, quantity, transaction_date, price, store_id, staff_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [customer_id, book_id, quantity, transaction_date, price, 1, staff_id]
        );
      });

      return res.status(201).json({ message: "Data inserted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    try {
      const { transaction_id, quantity } = req.body; // Mendapatkan transaction_id dan quantity dari body request

      await transact(async (client) => {
        // Melakukan UPDATE quantity berdasarkan transaction_id yang diberikan
        await client.query(
          "UPDATE TABEL.transaction SET quantity = $1 WHERE transaction_id = $2",
          [quantity, transaction_id]
        );
      });

      return res.status(200).json({ message: "Data updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
