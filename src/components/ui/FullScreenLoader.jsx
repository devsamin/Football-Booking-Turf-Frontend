import { motion } from "framer-motion";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-green-600 font-semibold tracking-wide"
        >
          লোড হচ্ছে...
        </motion.p>
      </div>
    </div>
  );
};

export default FullScreenLoader;
