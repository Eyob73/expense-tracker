import StatCard from "../components/StatCard";
import {
  DollarSign,
  TrendingUp,
  Receipt,
  Tag,
  Edit3,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "../data/categories";
function ExpensesList({ expenses, onDelete, onEdit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const filtered = expenses
    .filter((exp) => {
      const matchSearch =
        exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.reason.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = !filterCategory || exp.category === filterCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (sortField === "amount") {
        return sortDir === "asc"
          ? parseFloat(aVal) - parseFloat(bVal)
          : parseFloat(bVal) - parseFloat(aVal);
      }
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortArrow = ({ field }) => {
    if (sortField !== field)
      return <span className="text-gray-300 ml-1 text-xs">↕</span>;
    return (
      <span className="text-violet-500 ml-1 text-xs">
        {sortDir === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold text-gray-800">
          All{" "}
          <span className="bg-linear-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
            Expenses
          </span>
        </h2>
        <p className="text-gray-400 mt-1">
          {filtered.length} transactions found
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-gray-50 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none transition-all text-sm"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3.5 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-violet-500 outline-none transition-all text-sm text-gray-600"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gray-50 flex items-center justify-center">
              <Receipt className="w-6 h-6 text-gray-300" />
            </div>
            <h3 className="text-gray-500 font-medium">No expenses found</h3>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  {[
                    { key: "amount", label: "Amount" },
                    { key: "description", label: "Description" },
                    { key: "date", label: "Date" },
                    { key: "reason", label: "Reason" },
                    { key: "paymentMethod", label: "Payment" },
                    { key: "category", label: "Category" },
                    { key: "actions", label: "Actions" },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => key !== "actions" && handleSort(key)}
                      className={`py-3.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                        key !== "actions"
                          ? "cursor-pointer hover:text-gray-700 select-none"
                          : ""
                      }`}
                    >
                      <span className="flex items-center">
                        {label}
                        {key !== "actions" && <SortArrow field={key} />}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {filtered.map((exp) => {
                    const cat = CATEGORIES.find(
                      (c) => c.value === exp.category,
                    );
                    return (
                      <motion.tr
                        key={exp.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="hover:bg-violet-50/30 transition-colors group"
                      >
                        <td className="py-4 px-4">
                          <span className="font-bold text-gray-800">
                            ${parseFloat(exp.amount).toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-700 text-sm">
                            {exp.description}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-500">
                            {exp.date}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-500">
                            {exp.reason}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-500">
                            {exp.paymentMethod
                              ? exp.paymentMethod === "card"
                                ? "Card"
                                : exp.paymentMethod === "cash"
                                  ? "Cash"
                                  : exp.paymentMethod === "bank"
                                    ? "Bank"
                                    : exp.paymentMethod === "mobile"
                                      ? "Mobile"
                                      : exp.paymentMethod
                              : "—"}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${cat?.color || "bg-gray-100 text-gray-700"}`}
                          >
                            {cat?.label || exp.category}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => onEdit(exp)}
                              className="p-2 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-all opacity-0 group-hover:opacity-100"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(exp.id)}
                              className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-100 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-center text-gray-800">
                Delete Expense?
              </h3>
              <p className="text-gray-400 text-sm text-center mt-1">
                This action cannot be undone.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDelete(showDeleteConfirm);
                    setShowDeleteConfirm(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl font-medium text-white bg-red-500 hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ExpensesList;
