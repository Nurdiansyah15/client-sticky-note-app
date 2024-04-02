import * as Icon from "react-feather";

function NoteList({
  title = "Note Title",
  content = "Note Content",
  date = "Today, 12.00 PM",
  onClickDetail,
  onClickDelete,
}) {
  const formattedDateTime = new Date(date).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  return (
    <div
      onClick={onClickDetail}
      className="my-6 w-full h-fit p-4 border-t-4 border-amber-400 rounded bg-slate-600 hover:bg-slate-500 cursor-pointer"
    >
      <div className="border-b-2 pb-2 border-slate-400 flex justify-between">
        <p className="text-2xl font-bold text-white">{title}</p>
        <div
          className="w-fit h-fit hover:bg-red-900 rounded-full p-1 translate-x-[30%] translate-y-[-30%]"
          onClick={(e) => onClickDelete(e)}
        >
          <Icon.X size={18} color="white" />
        </div>
      </div>
      <div className="py-2">
        <p className="truncate text-white">{content}</p>
      </div>
      <div className="flex justify-end mt-2">
        <p className="text-slate-300 text-sm">{formattedDateTime}</p>
      </div>
    </div>
  );
}

export default NoteList;
