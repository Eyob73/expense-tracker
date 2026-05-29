"use client";

import { useEffect, useState } from "react";

type Expense = {
  id: string;
  amount: number;
  reason: string;
  method: string;
  category: string;
  date: string; // ISO date
};

const STORAGE_KEY = "expenses_v1";

function getRowClass(amount: number) {
  if (amount > 5000) return "bg-red-200 text-red-900";
  if (amount > 1000) return "bg-rose-100 text-rose-900"; // light red
  if (amount > 500) return "bg-yellow-100 text-yellow-900";
  return "bg-green-100 text-green-900";
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [form, setForm] = useState({
    amount: "",
    reason: "",
    method: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setExpenses(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load expenses", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (e) {
      console.error("Failed to save expenses", e);
    }
  }, [expenses]);

  function resetForm() {
    setForm((f) => ({ ...f, amount: "", reason: "", method: "", category: "", date: new Date().toISOString().slice(0, 10) }));
  }

  function addExpense(e: React.FormEvent) {
    e.preventDefault();
    const amount = Number(form.amount);
    if (Number.isNaN(amount) || amount <= 0) return alert("Enter a valid amount > 0");
    const newExp: Expense = {
      id: String(Date.now()),
      amount,
      reason: form.reason || "-",
      method: form.method || "-",
      category: form.category || "-",
      date: form.date,
    };
    setExpenses((s) => [newExp, ...s]);
    resetForm();
  }

  function removeExpense(id: string) {
    setExpenses((s) => s.filter((x) => x.id !== id));
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-8 bg-gray-50">
      <div className="w-full max-w-4xl bg-white shadow rounded p-6">
        <h1 className="text-2xl font-semibold mb-4">Simple Expense Tracker</h1>

        <form onSubmit={addExpense} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Amount</label>
            <input
              className="border rounded px-2 py-1"
              type="number"
              step="0.01"
              min="0"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Reason</label>
            <input
              className="border rounded px-2 py-1"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Payment Method / Bank</label>
            <input
              className="border rounded px-2 py-1"
              value={form.method}
              onChange={(e) => setForm({ ...form, method: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Category</label>
            <input
              className="border rounded px-2 py-1"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Date</label>
            <input
              className="border rounded px-2 py-1"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <div className="flex items-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
              Add Expense
            </button>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left">
                <th className="px-3 py-2 border-b">Date</th>
                <th className="px-3 py-2 border-b">Reason</th>
                <th className="px-3 py-2 border-b">Category</th>
                <th className="px-3 py-2 border-b">Method</th>
                <th className="px-3 py-2 border-b">Amount</th>
                <th className="px-3 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-gray-500">
                    No expenses yet. Add one above.
                  </td>
                </tr>
              )}
              {expenses.map((ex) => (
                <tr key={ex.id} className={`${getRowClass(ex.amount)}`}> 
                  <td className="px-3 py-2 align-top">{ex.date}</td>
                  <td className="px-3 py-2 align-top">{ex.reason}</td>
                  <td className="px-3 py-2 align-top">{ex.category}</td>
                  <td className="px-3 py-2 align-top">{ex.method}</td>
                  <td className="px-3 py-2 align-top font-medium">${ex.amount.toFixed(2)}</td>
                  <td className="px-3 py-2 align-top">
                    <button
                      className="text-sm text-red-700 underline"
                      onClick={() => removeExpense(ex.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
