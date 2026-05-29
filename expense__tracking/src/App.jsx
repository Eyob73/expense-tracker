import { useState, useEffect } from "react";
import Header from "./components/Header";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import ExpensesList from "./pages/ExpensesList";
import ExpenseForm from "./pages/ExpenseForm";
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem("expenses");
    if (stored) {
      try {
        setExpenses(JSON.parse(stored));
      } catch {
        setExpenses([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (form) => {
    const newExpense = {
      id: nextId,
      ...form,
    };
    setExpenses((prev) => [newExpense, ...prev]);
    setCurrentPage("expenses");
    setNextId((prev) => prev + 1);
  };

  const updateExpense = (form) => {
    setExpenses((prev) =>
      prev.map((exp) =>
        exp.id === editingExpense.id ? { ...exp, ...form } : exp,
      ),
    );
    setEditingExpense(null);
    setCurrentPage("expenses");
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleEdit = (exp) => {
    setEditingExpense(exp);
    setCurrentPage("add");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-violet-50/30">
      <Header
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page);
          setEditingExpense(null);
        }}
      />

      <AnimatePresence mode="wait">
        {currentPage === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Dashboard expenses={expenses} />
          </motion.div>
        )}

        {currentPage === "expenses" && (
          <motion.div
            key="expenses"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ExpensesList
              expenses={expenses}
              onDelete={deleteExpense}
              onEdit={handleEdit}
            />
          </motion.div>
        )}

        {currentPage === "add" && (
          <motion.div
            key="add"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {editingExpense ? (
              <ExpenseForm
                onSubmit={updateExpense}
                initialData={editingExpense}
                onCancel={() => {
                  setEditingExpense(null);
                  setCurrentPage("expenses");
                }}
              />
            ) : (
              <ExpenseForm onSubmit={addExpense} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
