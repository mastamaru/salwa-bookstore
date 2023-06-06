import { transact } from "./db";

export default async function handler(req, res) {
  console.log("Received request:", req.method, req.url);

  if (req.method === "DELETE") {
    const transaction_id = req.query.transaction_id; // Get transactionId from query parameters
    console.log("Deleting transaction:", transaction_id);

    try {
      const result = await transact(async (client) => {
        return await client.query(
          "DELETE FROM TABEL.transaction WHERE transaction_id = $1 RETURNING *",
          [transaction_id]
        );
      });

      if (result.rowCount > 0) {
        console.log("Successfully deleted transaction:", transaction_id);
        return res.status(204).end(); // Success response with no content
      } else {
        console.error("Transaction not found:", transaction_id);
        return res.status(404).json({ message: "Transaction not found" });
      }
    } catch (err) {
      console.error("Error deleting transaction:", transaction_id, err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    console.error("Unexpected request method:", req.method);
    return res.status(405).end(); // Method Not Allowed
  }
}
