import { motion } from "framer-motion";
import {
  Plus,
  Edit3,
  DollarSign,
  Calendar,
  FileText,
  Tag,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";
import { CATEGORIES } from "../data/categories";

function ExpenseForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    amount: initialData?.amount || "",
    description: initialData?.description || "",
    date: initialData?.date || new Date().toISOString().split("T")[0],
    reason: initialData?.reason || "",
    category: initialData?.category || "",
    paymentMethod: initialData?.paymentMethod || "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.amount || parseFloat(form.amount) <= 0)
      newErrors.amount = "Enter a valid amount";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.reason.trim()) newErrors.reason = "Reason is required";
    if (!form.category) newErrors.category = "Select a category";
    if (!form.paymentMethod)
      newErrors.paymentMethod = "Select a payment method";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
      if (!initialData) {
        setForm({
          amount: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
          reason: "",
          category: "",
        });
      }
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const inputClasses = (field) =>
    `w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none text-sm ${
      errors[field]
        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100"
        : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
    }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 py-8"
    >
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-linear-to-br from-blue-500 to-cyan-500 p-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {initialData ? (
              <Edit3 className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            {initialData ? "Edit Expense" : "Add New Expense"}
          </h2>
          <p className="text-violet-100 text-sm mt-1">
            {initialData
              ? "Update the expense details below"
              : "Fill in the details to track your expense"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" /> Amount
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                className={inputClasses("amount")}
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className={inputClasses("date")}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Description
            </label>
            <input
              type="text"
              placeholder="e.g., Grocery shopping at Whole Foods"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={inputClasses("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Reason
            </label>
            <input
              type="text"
              placeholder="e.g., Weekly grocery restock"
              value={form.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              className={inputClasses("reason")}
            />
            {errors.reason && (
              <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => handleChange("category", cat.value)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 border-2 ${
                    form.category === cat.value
                      ? `${cat.color} border-transparent ring-2 ring-blue-300`
                      : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Payment Method
            </label>
            <select
              value={form.paymentMethod}
              onChange={(e) => handleChange("paymentMethod", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all text-sm"
            >
              <option value="">Select payment method</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bank">Bank Transfer</option>
              <option value="mobile">Mobile Pay</option>
              <option value="other">Other</option>
            </select>
            {errors.paymentMethod && (
              <p className="text-red-500 text-xs mt-1">
                {errors.paymentMethod}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-linear-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-violet-200 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Check className="w-4 h-4" />
              {initialData ? "Update Expense" : "Add Expense"}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 rounded-xl font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 active:scale-[0.98]"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default ExpenseForm;
