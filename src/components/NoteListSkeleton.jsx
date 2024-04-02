function NoteListSkeleton() {
  return (
    <div className="my-6 w-full h-fit p-4 py-6 border-t-4 border-amber-300 rounded bg-slate-600 opacity-80 animate-pulse">
      <div className="border-b-2 pb-2 border-slate-400 flex justify-between">
        <div className="h-3 w-1/3 bg-slate-500 rounded-full"></div>
        <div className="w-4 h-4 bg-slate-500 rounded-full p-1 translate-x-[30%] translate-y-[-30%]"></div>
      </div>
      <div className="py-2">
        <div className="h-3 w-full bg-slate-500 rounded-full"></div>
      </div>
      <div className="flex justify-end mt-2">
        <div className="h-2 w-full bg-slate-500 rounded-full"></div>
      </div>
    </div>
  );
}

export default NoteListSkeleton;
