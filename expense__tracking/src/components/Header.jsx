import { motion } from "framer-motion";
import { Plus, Receipt, Wallet, BarChart3 } from "lucide-react";

function Header({ currentPage, setCurrentPage }) {
  const navItems = [
    { id: "home", label: "Dashboard", icon: BarChart3 },
    { id: "expenses", label: "Expenses", icon: Receipt },
    { id: "add", label: "Add New", icon: Plus },
  ];

  return (
    <header className="w-full bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-linear-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
              ExpenseFlow
            </h1>
          </motion.div>
          <nav className="flex gap-1 bg-gray-50 p-1 rounded-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-linear-to-r from-blue-500 to-cyan-600 rounded-lg shadow-md shadow-violet-200"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 hidden sm:inline">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
