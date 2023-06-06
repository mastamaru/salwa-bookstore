import Head from "next/head";
//import global css
import "../app/globals.css";
import { useState, useEffect } from "react";

//import component
import InputKolom from "@/components/inputKolom";
export default function Home() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/transaction", {
      method: "POST",
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

  // const handleDelete = (transactionId) => {
  //   fetch("/api/transaction", {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ transactionId }),
  //   })
  //     .then(() => {
  //       // Refresh data setelah berhasil menghapus transaksi
  //       fetch("/api/transaction", {
  //         method: "POST",
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           setTransactions(data);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  return (
    <>
      <Head>
        <title>Salwa Bookstore</title>
      </Head>
      <section className="body bg-white py-20">
        <div className="flex flex-col mx-auto text-center justify-center items-center w-[820px]">
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
              <input className="w-[120px] ring-1"></input>
              <input className="w-[120px] ring-1"></input>
              <input className="w-[120px] ring-1"></input>
            </div>
            <div className="flex flex-col items-start gap-3 font-medium">
              <h3 className="text-md">Customer Name</h3>
              <h3 className="text-md">Date</h3>
              <h3 className="text-md">Price</h3>
            </div>
            <div className="flex flex-col gap-3">
              <input className="w-[120px] ring-1"></input>
              <input className="w-[120px] ring-1"></input>
              <input className="w-[120px] ring-1"></input>
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
                    <td>{transaction.quantity}</td>
                    <td>{transaction.price}</td>
                    <td>{transaction.customer_id}</td>
                    <td>
                      <button className="w-[100px] h-[30px] bg-blue-400 text-white">
                        Edit Quantity
                      </button>
                    </td>
                    <td>
                      <button className="w-[100px] h-[30px] rounded-md bg-red-600 text-white">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="font-medium bg-green-300 w-[100px] mt-3 h-[35px]">
            submit
          </button>
        </div>
      </section>
    </>
  );
}
