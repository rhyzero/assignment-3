/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Credits = (props) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {
      // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = credit.date.slice(0, 10);
      return (
        <li key={credit.id}>
          {credit.amount} {credit.description} {date}
        </li>
      );
    });
  };

  return (
    <div>
      <h1>Credits</h1>

      {creditsView()}

      <form onSubmit={props.addCredit}>
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

export default Credits;
