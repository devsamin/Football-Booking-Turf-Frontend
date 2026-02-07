export const Button = ({
  children,
  onClick,
  variant = "default",
  className,
}) => {
  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-medium transition ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
