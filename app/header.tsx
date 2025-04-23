import React from "react";

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <h5 className="text-xl font-medium w-max">
          {" "}
          MONSOON REVOLUTION ARCHIVE{" "}
        </h5>
        <p className="text-xs font-light w-max">
          Memory. Justice. Accountability
        </p>
      </div>
    </div>
  );
}
