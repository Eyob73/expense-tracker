import { motion } from "framer-motion";
function StatCard({ icon: Icon, label, value, gradient, shadowColor }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden rounded-2xl p-5 bg-white border border-gray-100 shadow-sm`}
    >
      <div
        className={`absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 rounded-full opacity-10 ${gradient}`}
      />
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center ${shadowColor}`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-400 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;
