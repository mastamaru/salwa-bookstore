import Head from "next/head";
//import global css
import "../app/globals.css";
import { useState, useEffect } from "react";

//import component
import InputKolom from "@/components/inputKolom";
export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [customer_id, setCustomerID] = useState("");
  const [book_id, setBookID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [staff_id, setStaffID] = useState("");
  const [transaction_date, setTransactionDate] = useState("");
  const [price, setPrice] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  //menambahkan data ke server
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: parseInt(customer_id),
          book_id: parseInt(book_id),
          quantity: parseInt(quantity),
          staff_id: parseInt(staff_id),
          transaction_date: parseInt(transaction_date),
          price: parseFloat(price),
        }),
      });

      if (response.ok) {
        // Data berhasil ditambahkan
        console.log("Data inserted successfully");

        // Mengambil data terbaru setelah berhasil menambahkan data baru
        fetch("/api/transaction", {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setTransactions(data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // Gagal menambahkan data
        console.error("Failed to insert data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // menampilkan data dari server
  useEffect(() => {
    fetch("/api/transaction", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTransactions(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = async (transactionId) => {
    try {
      const response = await fetch(`/api/transaction`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transaction_id: parseInt(transactionId, 10),
        }),
      });

      if (response.status === 204) {
        // Data berhasil dihapus
        console.log("Data deleted successfully");

        // Mengambil data terbaru setelah berhasil menghapus data
        const newResponse = await fetch("/api/transaction", {
          method: "GET",
        });

        if (newResponse.ok) {
          const data = await newResponse.json();
          console.log(data);
          setTransactions(data);
        } else {
          // Gagal mendapatkan data baru
          console.error("Failed to fetch new data");
        }
      } else {
        // Gagal menghapus data
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //edit quantity
  const handleEditSubmit = async () => {
    // Panggil API untuk update data

    const response = await fetch("/api/transaction", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transaction_id: editingId,
        quantity: parseInt(editingValue, 10),
      }),
    });

    if (response.ok) {
      console.log("Data updated successfully");
      setIsEditing(false);
      setEditingId(null);
      // Refresh data
      fetch("/api/transaction", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTransactions(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("Failed to update data");
    }
  };

  return (
    <>
      <Head>
        <title>Salwa Bookstore</title>
      </Head>
      <section className="body bg-white py-20">
        <div className="flex flex-col mx-auto text-center justify-center items-center w-[840px]">
          <h1 className="text-[48px] text-center mx-auto">
            Welcome to Salwa's Bookstore ♡
          </h1>
          <div className="flex justify-evenly mt-12 gap-[120px]">
            <div className="flex flex-col items-start font-medium gap-3">
              <h3 className="text-md">Customer ID</h3>
              <h3 className="text-md">Book ID</h3>
              <h3 className="text-md">Quantity</h3>
            </div>
            <div className="flex flex-col gap-3">
              <input
                className="w-[120px] ring-1 text-center"
                value={customer_id}
                onChange={(e) => setCustomerID(e.target.value)}
              />
              <input
                className="w-[120px] ring-1 text-center"
                value={book_id}
                onChange={(e) => setBookID(e.target.value)}
              />
              <input
                className="w-[120px] ring-1 text-center"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start gap-3 font-medium">
              <h3 className="text-md">Staff ID</h3>
              <h3 className="text-md">Transaction Date </h3>
              <h3 className="text-md">Price</h3>
            </div>
            <div className="flex flex-col gap-3">
              <input
                className="w-[120px] ring-1 text-center"
                value={staff_id}
                onChange={(e) => setStaffID(e.target.value)}
              />
              <input
                className="w-[120px] ring-1 text-center"
                value={transaction_date}
                placeholder="year"
                onChange={(e) => setTransactionDate(e.target.value)}
              />
              <input
                className="w-[120px] ring-1 text-center"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-slate-100 h-[440px] mt-12 w-full overflow-y-scroll">
            <table className="table-style">
              <thead>
                <tr>
                  <th className="bg-gray-300">Book ID</th>
                  <th className="bg-gray-400">Quantity</th>
                  <th className="bg-gray-300">Price</th>
                  <th className="bg-gray-400">Customer ID</th>
                  <th className="bg-gray-300">Edit</th>
                  <th className="bg-gray-400">Delete</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.transaction_id}>
                    <td>{transaction.book_id}</td>
                    <td>
                      {isEditing && transaction.transaction_id === editingId ? (
                        <input
                          className="w-[50px] h-[30px] text-center ring-1"
                          type="number"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                        />
                      ) : (
                        transaction.quantity
                      )}
                    </td>

                    <td>{transaction.price}</td>
                    <td>{transaction.customer_id}</td>
                    <td>
                      {isEditing && transaction.transaction_id === editingId ? (
                        <button
                          className="w-[100px] h-[30px] bg-green-400 text-white rounded-md"
                          onClick={handleEditSubmit}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="w-[100px] h-[30px] bg-blue-400 text-white rounded-md"
                          onClick={() => {
                            setIsEditing(true);
                            setEditingId(transaction.transaction_id);
                            setEditingValue(transaction.quantity);
                          }}
                        >
                          Edit Quantity
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="w-[100px] h-[30px] rounded-md bg-red-600 text-white"
                        onClick={() => handleDelete(transaction.transaction_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="font-medium bg-green-300 w-[100px] mt-3 h-[35px]"
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
      </section>
    </>
  );
}
