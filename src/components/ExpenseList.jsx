import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/expenses')
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error('Error fetching expenses', err));
  }, []);

  const getColor = (amount) => {
    if (amount <= 10000) return 'green';
    if (amount > 10000 && amount <= 99999) return 'orange';
    return 'red';
  };

  return (
    <div className="p-4">
      <h2>Expenses</h2>
      {expenses.map(exp => (
        <div key={exp.id} style={{ color: getColor(exp.amount) }}>
          {exp.date} - {exp.title} - ₹{exp.amount}
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
