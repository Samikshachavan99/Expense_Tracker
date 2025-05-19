import React, { useState } from 'react';
import axios from 'axios';

function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = { title, amount: parseInt(amount), date };

    try {
      const response = await axios.post('http://localhost:5000/api/expenses', newExpense);
      onAdd(response.data); // Send back to parent to update state
      setTitle('');
      setAmount('');
      setDate('');
    } catch (error) {
      alert('Error adding expense');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} type="number" required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
