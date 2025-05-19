import React, { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState([]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!title || !amount || !date) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      date,
    };

    setExpenses([...expenses, newExpense]);
    setTitle('');
    setAmount('');
    setDate('');
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <form className="expense-form" onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Expense</button>
      </form>

      <div className="expenses-list">
        {expenses.length === 0 && <p>No expenses added yet.</p>}
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <div className="expense-info">
              <span className="expense-title">{expense.title}</span>
              <span className="expense-date">{expense.date}</span>
            </div>
            <div
              className={
                expense.amount <= 10000
                  ? 'amount-green'
                  : expense.amount < 100000
                  ? 'amount-yellow'
                  : 'amount-red'
              }
            >
              ₹{expense.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
