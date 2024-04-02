function Button({ child, className, type, onClick }) {
  return (
    <button onClick={onClick}
      type={type}
      className={`${className} block w-fit h-fit bg-slate-500 text-white rounded px-6 py-2 hover:bg-slate-600`}
    >
      {child}
    </button>
  );
}

export default Button;
