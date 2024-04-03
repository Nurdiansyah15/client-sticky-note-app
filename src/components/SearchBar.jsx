import ButtonNav from "./ButtonNav";
import * as Icon from "react-feather";
import * as React from "react";

function SearchBar({ onChange, valueSearch }) {
  return (
    <div className="my-5 h-12 flex">
      <input
        onChange={(e) => onChange(e.target.value)}
        type="text"
        className="outline-none w-11/12 h-full p-5 bg-slate-500 text-white"
        placeholder="Search..."
        value={valueSearch}
      />
      <ButtonNav
        // onClick={() => handleSearch(search)}
        className={"bg-slate-500 h-full"}
        child={<Icon.Search size={20} color="white" />}
      />
    </div>
  );
}

export default SearchBar;
