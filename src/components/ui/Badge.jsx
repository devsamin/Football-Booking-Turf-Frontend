// export const Badge = ({ children, variant = "default", className }) => {
//   const variants = {
//     default: "bg-gray-200 text-gray-800",
//     success: "bg-green-100 text-green-700",
//     danger: "bg-red-100 text-red-700",
//     warning: "bg-yellow-100 text-yellow-700",
//   };

//   return (
//     <span
//       className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
//     >
//       {children}
//     </span>
//   );
// };

export const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-100 text-green-700",
    danger: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
