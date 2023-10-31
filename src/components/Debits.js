/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Debits = (props) => {
  // Create the list of Debit items
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {
      // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0, 10);
      return (
        <li key={debit.id}>
          {debit.amount} {debit.description} {date}
        </li>
      );
    });
  };

  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      {debitsView()}

      <form onSubmit={props.addDebit}>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleDescription}
        />
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button type="submit">Add Debit</button>
      </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Debits;
