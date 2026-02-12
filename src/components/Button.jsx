const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyle = "w-full py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-lg active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/30",
    secondary: "bg-white text-gray-700 border-2 border-gray-100 hover:bg-gray-50",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;