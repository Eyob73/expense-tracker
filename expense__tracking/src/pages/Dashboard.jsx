import { motion } from "framer-motion";
import StatCard from "../components/StatCard";
import { DollarSign, TrendingUp, Receipt, Tag } from "lucide-react";
import { CATEGORIES } from "../data/categories";
function Dashboard({ expenses }) {
  const totalAmount = expenses.reduce(
    (sum, exp) => sum + parseFloat(exp.amount),
    0,
  );
  const totalTransactions = expenses.length;
  const categoryCount = {};
  expenses.forEach((exp) => {
    categoryCount[exp.category] = (categoryCount[exp.category] || 0) + 1;
  });
  const topCategory = Object.entries(categoryCount).sort(
    (a, b) => b[1] - a[1],
  )[0];
  const thisMonth = expenses.filter((exp) => {
    const d = new Date(exp.date);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });
  const monthTotal = thisMonth.reduce(
    (sum, exp) => sum + parseFloat(exp.amount),
    0,
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800">
          Good{" "}
          <span className="bg-linear-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
            Morning
          </span>
        </h2>
        <p className="text-gray-400 mt-1">Here's your expense overview</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={DollarSign}
          label="Total Spent"
          value={`$${totalAmount.toFixed(2)}`}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
          shadowColor="shadow-lg shadow-violet-200"
        />
        <StatCard
          icon={TrendingUp}
          label="This Month"
          value={`$${monthTotal.toFixed(2)}`}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
          shadowColor="shadow-lg shadow-blue-200"
        />
        <StatCard
          icon={Receipt}
          label="Transactions"
          value={totalTransactions}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
          shadowColor="shadow-lg shadow-emerald-200"
        />
        <StatCard
          icon={Tag}
          label="Top Category"
          value={
            topCategory
              ? CATEGORIES.find((c) => c.value === topCategory[0])?.label || "—"
              : "—"
          }
          gradient="bg-gradient-to-br from-orange-500 to-amber-500"
          shadowColor="shadow-lg shadow-orange-200"
        />
      </div>

      {expenses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="p-5 border-b border-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Transactions
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {expenses.slice(0, 5).map((exp) => {
              const cat = CATEGORIES.find((c) => c.value === exp.category);
              return (
                <div
                  key={exp.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${cat?.color || "bg-gray-100"} flex items-center justify-center`}
                    >
                      <Tag className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {exp.description}
                      </p>
                      <p className="text-sm text-gray-400">{exp.date}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800">
                    ${parseFloat(exp.amount).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {expenses.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white rounded-2xl border border-gray-100"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center">
            <Receipt className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600">
            No expenses yet
          </h3>
          <p className="text-gray-400 mt-1">
            Start tracking your expenses today
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;
