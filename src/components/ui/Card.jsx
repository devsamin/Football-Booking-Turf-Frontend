export const Card = ({ children, className }) => (
  <div className={`bg-white border rounded-2xl shadow-md ${className}`}>
    {children}
  </div>
);
