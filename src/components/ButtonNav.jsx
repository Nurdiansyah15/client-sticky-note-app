function ButtonNav({ child, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${className} flex w-[50px] h-[50px] hover:bg-slate-400 items-center justify-center`}
    >
      {child}
    </button>
  );
}

export default ButtonNav;
